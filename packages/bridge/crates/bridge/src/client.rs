use std::sync::Arc;

use chrono::{DateTime, Utc};
use neon::prelude::*;

use crate::error::create_js_error;
use crate::RUNTIME;
use eventstore::{
    Client, ClientSettings, Credentials, Position, ReadAllOptions, ReadStream, ReadStreamOptions,
    RecordedEvent, ResolvedEvent, StreamPosition,
};
use neon::{
    prelude::FunctionContext,
    result::JsResult,
    types::{JsBigInt, JsBoolean, JsFunction, JsObject, JsPromise, JsString, JsValue},
};
use serde::Serialize;
use tokio::sync::{Mutex};
use uuid::Uuid;

pub fn create(mut cx: FunctionContext) -> JsResult<JsObject> {
    let conn_string = cx.argument::<JsString>(0)?.value(&mut cx);

    let setts = match conn_string.parse::<ClientSettings>() {
        Err(e) => {
            let js_error = create_js_error(&mut cx, e)?;
            cx.throw(js_error)?
        }
        Ok(s) => s,
    };

    let client = match Client::with_runtime_handle(RUNTIME.handle().clone(), setts) {
        Err(e) => {
            let js_error = create_js_error(&mut cx, e)?;
            cx.throw(js_error)?
        }
        Ok(c) => c,
    };

    let obj = cx.empty_object();

    let local_client = client.clone();
    let client_read_stream =
        JsFunction::new(&mut cx, move |cx| read_stream(local_client.clone(), cx))?;

    let local_client = client.clone();
    let client_read_all = JsFunction::new(&mut cx, move |cx| read_all(local_client.clone(), cx))?;

    obj.set(&mut cx, "readStream", client_read_stream)?;
    obj.set(&mut cx, "readAll", client_read_all)?;

    Ok(obj)
}

pub enum Options {
    Regular {
        stream_name: String,
        options: ReadStreamOptions,
    },

    All(ReadAllOptions),
}

pub fn read_stream(client: Client, mut cx: FunctionContext) -> JsResult<JsPromise> {
    let stream_name = cx.argument::<JsString>(0)?.value(&mut cx);
    let params = if cx.len() >= 2 {
        if let Ok(arg) = cx.argument::<JsValue>(1) {
            arg.downcast::<JsObject, _>(&mut cx)
                .unwrap_or_else(|_| cx.empty_object())
        } else {
            cx.empty_object()
        }
    } else {
        cx.empty_object()
    };
    let mut options = ReadStreamOptions::default();

    let direction_str = match params.get_opt::<JsString, _, _>(&mut cx, "direction")? {
        Some(s) => s.value(&mut cx),
        None => "forwards".to_string(),
    };
    options = match direction_str.as_str() {
        "forwards" => options.forwards(),
        "backwards" => options.backwards(),
        x => return cx.throw_error(format!("invalid direction value: '{}'", x)),
    };

    if let Some(value) = params.get_opt::<JsValue, _, _>(&mut cx, "fromRevision")? {
        if let Ok(s) = value.downcast::<JsString, _>(&mut cx) {
            options = match s.value(&mut cx).as_str() {
                "start" => options.position(StreamPosition::Start),
                "end" => options.position(StreamPosition::End),
                x => return cx.throw_error(format!("invalid fromRevision value: '{}'", x)),
            };
        } else if let Ok(n) = value.downcast::<JsBigInt, _>(&mut cx) {
            match n.to_u64(&mut cx) {
                Ok(r) => options = options.position(StreamPosition::Position(r)),
                Err(e) => return cx.throw_error(e.to_string()),
            };
        } else {
            return cx.throw_error("fromRevision can only be 'start', 'end' or a bigint");
        }
    }

    if let Some(obj) = params.get_opt::<JsObject, _, _>(&mut cx, "credentials")? {
        let login = obj
            .get::<JsString, _, _>(&mut cx, "username")?
            .value(&mut cx);
        let password = obj
            .get::<JsString, _, _>(&mut cx, "password")?
            .value(&mut cx);
        options = options.authenticated(Credentials::new(login, password));
    }

    if let Some(js_bigint) = params.get_opt::<JsBigInt, _, _>(&mut cx, "maxCount")? {
        match js_bigint.to_u64(&mut cx) {
            Ok(r) => options = options.max_count(r as usize),
            Err(e) => return cx.throw_error(e.to_string()),
        }
    }

    let require_leader = params
        .get_opt::<JsBoolean, _, _>(&mut cx, "requiresLeader")?
        .map(|b| b.value(&mut cx))
        .unwrap_or(false);
    options = options.requires_leader(require_leader);

    let resolve_links = params
        .get_opt::<JsBoolean, _, _>(&mut cx, "resolvesLink")?
        .map(|b| b.value(&mut cx))
        .unwrap_or(false);
    options = if resolve_links {
        options.resolve_link_tos()
    } else {
        options
    };

    let options = Options::Regular {
        stream_name,
        options,
    };

    read_internal(client, options, cx)
}

pub fn read_all(client: Client, mut cx: FunctionContext) -> JsResult<JsPromise> {
    let params = if !cx.is_empty() {
        if let Ok(arg) = cx.argument::<JsValue>(0) {
            arg.downcast::<JsObject, _>(&mut cx)
                .unwrap_or_else(|_| cx.empty_object())
        } else {
            cx.empty_object()
        }
    } else {
        cx.empty_object()
    };

    let options = ReadAllOptions::default();

    let direction_str = match params.get_opt::<JsString, _, _>(&mut cx, "direction")? {
        Some(s) => s.value(&mut cx),
        None => "forwards".to_string(),
    };
    let options = match direction_str.as_str() {
        "forwards" => options.forwards(),
        "backwards" => options.backwards(),
        x => cx.throw_error(format!("invalid direction value: '{}'", x))?,
    };

    let options = if let Some(value) = params.get_opt::<JsValue, _, _>(&mut cx, "fromPosition")? {
        if let Ok(s) = value.downcast::<JsString, _>(&mut cx) {
            match s.value(&mut cx).as_str() {
                "start" => options.position(StreamPosition::Start),
                "end" => options.position(StreamPosition::End),
                x => cx.throw_error(format!("invalid fromPosition value: '{}'", x))?,
            }
        } else if let Ok(obj) = value.downcast::<JsObject, _>(&mut cx) {
            let commit = obj
                .get::<JsBigInt, _, _>(&mut cx, "commit")?
                .to_u64(&mut cx);
            let prepare = obj
                .get::<JsBigInt, _, _>(&mut cx, "prepare")?
                .to_u64(&mut cx);

            let position = commit.and_then(|commit| {
                prepare.map(|prepare| StreamPosition::Position(Position { commit, prepare }))
            });

            match position {
                Ok(p) => options.position(p),
                Err(e) => cx.throw_error(e.to_string())?,
            }
        } else {
            cx.throw_error(
                "fromPosition can only be 'start', 'end' or an object with 'commit' and 'prepare'",
            )?
        }
    } else {
        options.position(StreamPosition::Start)
    };

    let options = if let Some(obj) = params.get_opt::<JsObject, _, _>(&mut cx, "credentials")? {
        let login = obj
            .get::<JsString, _, _>(&mut cx, "username")?
            .value(&mut cx);
        let password = obj
            .get::<JsString, _, _>(&mut cx, "password")?
            .value(&mut cx);
        options.authenticated(Credentials::new(login, password))
    } else {
        options
    };

    let options = if let Some(js_bigint) = params.get_opt::<JsBigInt, _, _>(&mut cx, "maxCount")? {
        match js_bigint.to_u64(&mut cx) {
            Ok(r) => options.max_count(r as usize),
            Err(e) => return cx.throw_error(e.to_string()),
        }
    } else {
        options
    };

    let require_leader = params
        .get_opt::<JsBoolean, _, _>(&mut cx, "requiresLeader")?
        .map(|b| b.value(&mut cx))
        .unwrap_or(false);
    let options = options.requires_leader(require_leader);

    let resolve_links = params
        .get_opt::<JsBoolean, _, _>(&mut cx, "resolvesLink")?
        .map(|b| b.value(&mut cx))
        .unwrap_or(false);
    let options = if resolve_links {
        options.resolve_link_tos()
    } else {
        options
    };

    read_internal(client, Options::All(options), cx)
}

fn read_internal(client: Client, options: Options, mut cx: FunctionContext) -> JsResult<JsPromise> {
    let channel = cx.channel();
    let (deferred, promise) = cx.promise();
    RUNTIME.spawn(async move {
        let result = match options {
            Options::Regular {
                stream_name,
                options,
            } => client.read_stream(stream_name.as_str(), &options).await,

            Options::All(options) => client.read_all(&options).await,
        };

        deferred.settle_with(&channel, |mut cx| match result {
            Err(e) => {
                let js_error = create_js_error(&mut cx, e)?;
                cx.throw(js_error)
            }
            Ok(stream) => read_stream_ref(&mut cx, stream),
        });
    });

    Ok(promise)
}

#[derive(Serialize)]
struct ValueItem<'a> {
    value: Option<Vec<JsResolvedEvent<'a>>>,
    done: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct JsResolvedEvent<'a> {
    event: Option<JsRecordedEvent<'a>>,
    link: Option<JsRecordedEvent<'a>>,
    commit_position: Option<u64>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct JsRecordedEvent<'a> {
    stream_id: &'a str,
    id: Uuid,
    r#type: &'a str,
    is_json: bool,
    revision: u64,
    created: DateTime<Utc>,
    data: &'a [u8],
    metadata: &'a [u8],
    position: JsPosition,
}

#[derive(Serialize)]
struct JsPosition {
    commit: u64,
    prepare: u64,
}

fn js_resolve_event(event: &ResolvedEvent) -> JsResolvedEvent {
    let commit_position = event.commit_position;
    let link = event.link.as_ref().map(js_recorded_event);
    let event = event.event.as_ref().map(js_recorded_event);

    JsResolvedEvent {
        event,
        link,
        commit_position,
    }
}

fn js_recorded_event(event: &RecordedEvent) -> JsRecordedEvent {
    JsRecordedEvent {
        stream_id: event.stream_id.as_str(),
        id: event.id,
        r#type: event.event_type.as_str(),
        is_json: event.is_json,
        revision: event.revision,
        created: event.created,
        data: &event.data,
        metadata: &event.custom_metadata,
        position: JsPosition {
            commit: event.position.commit,
            prepare: event.position.prepare,
        },
    }
}

pub fn read_stream_next_mutex(mut cx: FunctionContext) -> JsResult<JsPromise> {
    let sender = cx.argument::<JsBox<ReadStreamRef>>(0)?.inner.clone();
    let (deferred, promise) = cx.promise();
    let channel = cx.channel();

    RUNTIME.spawn(async move {
        let result = {
            let mut stream = sender.lock().await;
            let batch_size = 64usize;
            let mut batch = Vec::with_capacity(batch_size);

            loop {
                match stream.next().await {
                    Err(e) => break Err(e),
                    Ok(event) => {
                        if let Some(event) = event {
                            batch.push(event);
                        } else if batch.is_empty() {
                            break Ok(None);
                        } else {
                            break Ok(Some(batch));
                        }

                        if batch.len() >= batch_size {
                            break Ok(Some(batch));
                        }
                    }
                }
            }
        };

        deferred.settle_with(&channel, |mut cx| match result {
            Err(e) => {
                let js_error = create_js_error(&mut cx, e)?;
                cx.throw(js_error)
            }
            Ok(events) => {
                let result = match events {
                    Some(events) => {
                        let js = events.iter().map(js_resolve_event).collect::<Vec<_>>();
                        serde_json::to_vec(&ValueItem {
                            value: Some(js),
                            done: false,
                        })
                        .unwrap()
                    }

                    None => serde_json::to_vec(&ValueItem {
                        value: None,
                        done: true,
                    })
                    .unwrap(),
                };

                JsBuffer::from_slice(&mut cx, result.as_slice())
            }
        });
    });

    Ok(promise)
}

struct ReadStreamRef {
    inner: Arc<Mutex<ReadStream>>,
}

impl ReadStreamRef {
    fn new(inner: ReadStream) -> Self {
        Self {
            inner: Arc::new(Mutex::new(inner)),
        }
    }
}

impl Finalize for ReadStreamRef {}

fn read_stream_ref<'a, C>(cx: &mut C, stream: ReadStream) -> JsResult<'a, JsBox<ReadStreamRef>>
where
    C: Context<'a>,
{
    Ok(JsBox::new(cx, ReadStreamRef::new(stream)))
}
