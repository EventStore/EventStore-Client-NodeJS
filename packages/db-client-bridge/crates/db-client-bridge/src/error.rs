use eventstore::Endpoint;
use neon::{object::Object, prelude::Context, prelude::JsError, result::JsResult};

#[derive(Debug)]
pub enum ErrorKind {
    UnavailableError,
    StreamNotFoundError,
    StreamDeletedError,
    ParseError,
    NotLeaderError(Endpoint),
    UnknownError(),
}

impl From<eventstore::Error> for ErrorKind {
    fn from(err: eventstore::Error) -> Self {
        match err {
            eventstore::Error::GrpcConnectionError(_) => ErrorKind::UnavailableError,
            eventstore::Error::ResourceNotFound => ErrorKind::StreamNotFoundError,
            eventstore::Error::ResourceDeleted => ErrorKind::StreamDeletedError,
            eventstore::Error::NotLeaderException(endpoint) => ErrorKind::NotLeaderError(endpoint),
            _ => ErrorKind::UnknownError(),
        }
    }
}

impl From<eventstore::ClientSettingsParseError> for ErrorKind {
    fn from(_: eventstore::ClientSettingsParseError) -> Self {
        ErrorKind::ParseError
    }
}

pub fn create_js_error<'a, C, E>(cx: &mut C, error: E) -> JsResult<'a, JsError>
where
    C: Context<'a>,
    E: Into<ErrorKind> + std::fmt::Display,
{
    let kind = ErrorKind::from(error.into());
    let error_name = format!("{:?}", kind);

    // todo: there must be a cleaner way to do this? as_ref?
    let type_name = match &kind {
        ErrorKind::UnavailableError => "UnavailableError",
        ErrorKind::StreamNotFoundError => "StreamNotFoundError",
        ErrorKind::StreamDeletedError => "StreamDeletedError",
        ErrorKind::ParseError => "ParseError",
        ErrorKind::NotLeaderError(_) => "NotLeaderError",
        ErrorKind::UnknownError() => "UnknownError",
    };

    let error = JsError::error(cx, &error_name)?;
    let name = cx.string(type_name);
    error.set(cx, "name", name)?;

    let metadata = cx.empty_object();

    match &kind {
        ErrorKind::NotLeaderError(endpoint) => {
            let host = cx.string(endpoint.host.to_string());
            let port = cx.number(endpoint.port);

            metadata.set(cx, "leader-endpoint-host", host)?;
            metadata.set(cx, "leader-endpoint-port", port)?;
        }
        _ => {}
    }

    error.set(cx, "metadata", metadata)?;

    Ok(error)
}
