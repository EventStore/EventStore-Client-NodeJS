use std::sync::Arc;

use neon::prelude::*;
use tokio::runtime::Runtime;

mod client;

lazy_static::lazy_static! {
    static ref RUNTIME: Arc<Runtime> = {
        let runtime = tokio::runtime::Builder::new_multi_thread()
            .enable_all()
            .build()
            .unwrap();

        Arc::new(runtime)
    };
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createClient", client::create)?;

    Ok(())
}
