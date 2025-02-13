use neon::prelude::*;

use eventstore::{
    Client, ClientSettings, Credentials, Position, ReadAllOptions, ReadStream, ReadStreamOptions,
    RecordedEvent, ResolvedEvent, StreamPosition,
};
use neon::{
    object::Object,
    prelude::{Context, FunctionContext},
    result::JsResult,
    types::{
        buffer::TypedArray, JsBigInt, JsBoolean, JsFunction, JsObject, JsPromise, JsString, JsValue,
    },
};

use crate::RUNTIME;

pub fn create(mut cx: FunctionContext) -> JsResult<JsObject> {
    let conn_string = cx.argument::<JsString>(0)?.value(&mut cx);

    let setts = match conn_string.parse::<ClientSettings>() {
        Err(e) => cx.throw_error(e.to_string())?,
        Ok(s) => s,
    };

    let client = match Client::with_runtime_handle(RUNTIME.handle().clone(), setts) {
        Err(e) => cx.throw_error(e.to_string())?,
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

type Msg = tokio::sync::oneshot::Sender<eventstore::Result<Option<ResolvedEvent>>>;

async fn read_process(mut recv: tokio::sync::mpsc::UnboundedReceiver<Msg>, mut stream: ReadStream) {
    while let Some(req) = recv.recv().await {
        let result = stream.next().await;

        let exit = if let Ok(result) = result.as_ref() {
            result.is_none()
        } else {
            true
        };

        let _ = req.send(result);
        if exit {
            break;
        }
    }
}

fn read_internal(client: Client, options: Options, mut cx: FunctionContext) -> JsResult<JsPromise> {
    let promise = cx
        .task(move || {
            let result = match options {
                Options::Regular {
                    stream_name,
                    options,
                } => RUNTIME.block_on(client.read_stream(stream_name.as_str(), &options)),

                Options::All(options) => RUNTIME.block_on(client.read_all(&options)),
            };

            result
        })
        .promise(|mut cx, result| match result {
            Err(e) => cx.throw_error(e.to_string()),
            Ok(stream) => wrap_read_stream(&mut cx, stream),
        });

    Ok(promise)
}

pub fn read_stream_next(mut cx: FunctionContext) -> JsResult<JsPromise> {
    let sender = cx.argument::<JsBox<ReadStreamWrapper>>(0)?.inner.clone();
    let promise = cx
        .task(move || {
            let (req, result) = tokio::sync::oneshot::channel();
            let _ = sender.send(req);
            RUNTIME.block_on(result).expect("should never fail")
        })
        .promise(|mut cx, result| match result {
            Err(e) => cx.throw_error(e.to_string()),
            Ok(result) => {
                let item = cx.empty_object();
                let mut done = true;

                if let Some(mut event) = result {
                    let value = cx.empty_object();
                    done = false;

                    if let Some(event) = event.event.take() {
                        let event = recorded_event(&mut cx, event)?;
                        value.set(&mut cx, "event", event)?;
                    } else {
                        let null = cx.null();
                        value.set(&mut cx, "event", null)?;
                    }

                    if let Some(event) = event.link.take() {
                        let link = recorded_event(&mut cx, event)?;
                        value.set(&mut cx, "link", link)?;
                    } else {
                        let null = cx.null();
                        value.set(&mut cx, "link", null)?;
                    }

                    if let Some(commit) = event.commit_position.take() {
                        let commit = JsBigInt::from_u64(&mut cx, commit);
                        value.set(&mut cx, "commitPosition", commit)?;
                    } else {
                        let null = cx.null();
                        value.set(&mut cx, "commitPosition", null)?;
                    }

                    item.set(&mut cx, "value", value)?;
                } else {
                    let undefined = cx.undefined();
                    item.set(&mut cx, "value", undefined)?;
                }

                let done = cx.boolean(done);
                item.set(&mut cx, "done", done)?;

                Ok(item)
            }
        });

    Ok(promise)
}

struct ReadStreamWrapper {
    inner: tokio::sync::mpsc::UnboundedSender<Msg>,
}

impl ReadStreamWrapper {
    fn new(inner: tokio::sync::mpsc::UnboundedSender<Msg>) -> Self {
        Self { inner }
    }
}

impl Finalize for ReadStreamWrapper {}

fn wrap_read_stream<'a, C>(cx: &mut C, stream: ReadStream) -> JsResult<'a, JsBox<ReadStreamWrapper>>
where
    C: Context<'a>,
{
    let (sender, recv) = tokio::sync::mpsc::unbounded_channel();
    RUNTIME.spawn(read_process(recv, stream));
    Ok(JsBox::new(cx, ReadStreamWrapper::new(sender)))
}

// fn convert_read_internal_error<'a, C>(
//     cx: &mut C,
//     e: eventstore::Error,
// ) -> NeonResult<eventstore::ReadStream>
// where
//     C: Context<'a>,
// {
//     create_read_internal_error(cx, e)
// }

// fn create_read_internal_error<'a, C>(
//     cx: &mut C,
//     e: eventstore::Error,
// ) -> NeonResult<eventstore::ReadStream>
// where
//     C: Context<'a>,
// {
//     let js_err = JsError::type_error(cx, e.to_string())?;
//     let variant_name = format!("{:?}", e);
//     let js_str = cx.string(variant_name);
//     js_err.set(cx, "name", js_str)?;
//     cx.throw(js_err)?
// }

// fn async_iterator_object<'a, C>(cx: C, stream: ReadStream) -> JsResult<'a, JsObject>
// where
//     C: Context<'a>,
// {
//     async_iterator_impl(cx, Arc::new(Mutex::new(stream)))
// }

// fn async_iterator_impl<'a, C>(mut cx: C, stream: Arc<Mutex<ReadStream>>) -> JsResult<'a, JsObject>
// where
//     C: Context<'a>,
// {
//     let obj = cx.empty_object();

//     let stream_next = JsFunction::new(&mut cx, move |mut cx| {
//         let (deferred, promise) = cx.promise();
//         let stream = stream.clone();
//         let channel = cx.channel();

//         RUNTIME.spawn(async move {
//             let mut stream = stream.lock().await;
//             let result = stream.next().await;

//             deferred.settle_with(&channel, |mut cx| {
//                 let result = result.or_else(|e| convert_iterator_error(&mut cx, e))?;

//                 let item = cx.empty_object();
//                 let mut done = true;

//                 if let Some(mut event) = result {
//                     let value = cx.empty_object();
//                     done = false;

//                     if let Some(event) = event.event.take() {
//                         let event = recorded_event(&mut cx, event)?;
//                         value.set(&mut cx, "event", event)?;
//                     } else {
//                         let null = cx.null();
//                         value.set(&mut cx, "event", null)?;
//                     }

//                     if let Some(event) = event.link.take() {
//                         let link = recorded_event(&mut cx, event)?;
//                         value.set(&mut cx, "link", link)?;
//                     } else {
//                         let null = cx.null();
//                         value.set(&mut cx, "link", null)?;
//                     }

//                     if let Some(commit) = event.commit_position.take() {
//                         let commit = JsBigInt::from_u64(&mut cx, commit);
//                         value.set(&mut cx, "commitPosition", commit)?;
//                     } else {
//                         let null = cx.null();
//                         value.set(&mut cx, "commitPosition", null)?;
//                     }

//                     item.set(&mut cx, "value", value)?;
//                 } else {
//                     let undefined = cx.undefined();
//                     item.set(&mut cx, "value", undefined)?;
//                 }

//                 let done = cx.boolean(done);
//                 item.set(&mut cx, "done", done)?;

//                 Ok(item)
//             });
//         });

//         Ok(promise)
//     })?;

//     obj.set(&mut cx, "next", stream_next)?;

//     Ok(obj)
// }

// fn convert_iterator_error<'a, C>(
//     cx: &mut C,
//     e: eventstore::Error,
// ) -> NeonResult<Option<eventstore::ResolvedEvent>>
// where
//     C: Context<'a>,
// {
//     match e {
//         eventstore::Error::ResourceNotFound => {
//             // todo: input stream name
//             create_iterator_error(cx, e)
//         }
//         e => create_iterator_error(cx, e),
//     }
// }

// fn create_iterator_error<'a, C>(
//     cx: &mut C,
//     e: eventstore::Error,
// ) -> NeonResult<Option<eventstore::ResolvedEvent>>
// where
//     C: Context<'a>,
// {
//     let js_err = JsError::type_error(cx, e.to_string())?;
//     let variant_name = format!("{:?}", e);
//     let js_str = cx.string(variant_name);
//     js_err.set(cx, "name", js_str)?;
//     cx.throw(js_err)?;
//     Ok(None)
// }

fn recorded_event<'a, C>(cx: &mut C, event: RecordedEvent) -> JsResult<'a, JsObject>
where
    C: Context<'a>,
{
    let obj = cx.empty_object();

    let stream_id = cx.string(event.stream_id);
    let r#type = cx.string(event.event_type);
    let id = cx.string(event.id.to_string());
    let is_json = cx.boolean(event.is_json);
    let revision = JsBigInt::from_u64(cx, event.revision);
    let created = cx
        .date(event.created.timestamp() as f64 * 1000.0)
        .or_else(|e| cx.throw_error(e.to_string()))?;

    let mut data = cx.array_buffer(event.data.len())?;
    data.as_mut_slice(cx).copy_from_slice(&event.data);

    let mut metadata = JsUint8Array::new(cx, event.custom_metadata.len())?;
    metadata
        .as_mut_slice(cx)
        .copy_from_slice(&event.custom_metadata);

    let position = cx.empty_object();
    let commit = JsBigInt::from_u64(cx, event.position.commit);
    let prepare = JsBigInt::from_u64(cx, event.position.prepare);

    position.set(cx, "commit", commit)?;
    position.set(cx, "prepare", prepare)?;

    obj.set(cx, "streamId", stream_id)?;
    obj.set(cx, "id", id)?;
    obj.set(cx, "type", r#type)?;
    obj.set(cx, "isJson", is_json)?;
    obj.set(cx, "revision", revision)?;
    obj.set(cx, "created", created)?;
    obj.set(cx, "data", data)?;
    obj.set(cx, "metadata", metadata)?;
    obj.set(cx, "position", position)?;

    Ok(obj)
}
