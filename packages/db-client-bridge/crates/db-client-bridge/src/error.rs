use neon::{object::Object, prelude::Context, prelude::JsError, result::JsResult};

#[derive(Debug)]
pub enum ErrorKind {
    UnavailableError,
    StreamNotFoundError,
    StreamDeletedError,
    ParseError,
    UnknownError(),
}

impl From<eventstore::Error> for ErrorKind {
    fn from(err: eventstore::Error) -> Self {
        match err {
            eventstore::Error::GrpcConnectionError(_) => ErrorKind::UnavailableError,
            eventstore::Error::ResourceNotFound => ErrorKind::StreamNotFoundError,
            eventstore::Error::ResourceDeleted => ErrorKind::StreamDeletedError,
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
    let error = JsError::error(cx, &error_name)?;
    let name = cx.string(error_name);
    error.set(cx, "name", name)?;
    Ok(error)
}
