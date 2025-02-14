use neon::prelude::*;
use tokio::runtime::Runtime;

mod client;

lazy_static::lazy_static! {
    static ref RUNTIME: Runtime = {
        let runtime = tokio::runtime::Builder::new_multi_thread()
            .enable_all()
            .build()
            .unwrap();

        runtime
    };
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createClient", client::create)?;
    cx.export_function("readStreamNext", client::read_stream_next)?;

    Ok(())
}
