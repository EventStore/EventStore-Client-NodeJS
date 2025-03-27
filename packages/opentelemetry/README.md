# @kurrent/opentelemetry

[![license][license-badge]][license-badge-url]
[![Github action CI workflow][ci-badge]][ci-badge-url]

This module provides automatic tracing instrumentation for [KurrentDB-Client-NodeJS].

Compatible with OpenTelemetry JS API and SDK `1.0+`.

## Installation

```bash
npm install --save @kurrent/opentelemetry
```

### Supported Versions

- `[1.x]`

It's likely that the instrumentation would support earlier versions of KurrentDB, but this has not been tested.

## Usage

OpenTelemetry KurrentDB Instrumentation allows the user to automatically collect trace data from append and subscription operations and export them to the backend of choice.

To load the instrumentation, specify it in the instrumentations list to `registerInstrumentations`. There is currently no configuration option.

```javascript
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { EventStoreDBInstrumentation } = require('@kurrent/opentelemetry');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new KurrentDBInstrumentation(),
  ],
});
```

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, open an issue or submit a PR


## Support

Information on support can be found on our website: [Kurrent Support]

## Communities

- [Discuss]
- [Discord (Kurrent)][discord-kurrent]
- [Discord (ddd-cqrs-es)][Discord-ddd-cqrs-es]

## Contributing

Refer to our [contribution guidelines]

[Kurrent support]: https://kurrent.io/support/
[discuss]: https://discuss.kurrent.io/
[discord-kurrent]: https://discord.gg/Phn9pmCw3t
[Discord-ddd-cqrs-es]: https://discord.com/invite/sEZGSHNNbH
[contribution guidelines]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/blob/master/CONTRIBUTING.md
[license-badge]: https://img.shields.io/npm/l/@kurrent/kurrentdb-client.svg
[license-badge-url]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/blob/master/LICENSE
[ci-badge-url]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/actions
[KurrentDB-Client-NodeJS]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS
[ci-badge]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/workflows/CI/badge.svg?branch=master
[ci-badge-url]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/actions