# @eventstore/opentelemetry

[![license][license-badge]][license-badge-url]
[![Github action CI workflow][ci-badge]][ci-badge-url]

This module provides automatic tracing instrumentation for [EventStore-Client-NodeJS].

Compatible with OpenTelemetry JS API and SDK `1.0+`.

## Installation

```bash
npm install --save @eventstore/opentelemetry
```

### Supported Versions

- `[6.x]`

It's likely that the instrumentation would support earlier versions of EventStoreDB, but this has not been tested.

## Usage

OpenTelemetry EventStoreDB Instrumentation allows the user to automatically collect trace data from append and subscription operations and export them to the backend of choice.

To load the instrumentation, specify it in the instrumentations list to `registerInstrumentations`. There is currently no configuration option.

```javascript
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { EventStoreDBInstrumentation } = require('@eventstore/opentelemetry');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new EventStoreDBInstrumentation(),
  ],
});
```

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, open an issue or submit a PR


## Support

Information on support can be found on our website: [Event Store Support]

## Communities

- [Discuss]
- [Discord (Event Store)][discord-event-store]
- [Discord (ddd-cqrs-es)][Discord-ddd-cqrs-es]

## Contributing

Refer to our [contribution guidelines][contributing-guidelines].

[event store support]: https://eventstore.com/support/
[discuss]: https://discuss.eventstore.com/
[discord-event-store]: https://discord.gg/Phn9pmCw3t
[Discord-ddd-cqrs-es]: https://discord.com/invite/sEZGSHNNbH
[contributing-guidelines]: https://github.com/prisma/prisma/blob/main/CONTRIBUTING.md
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE
[ci-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/actions
[EventStore-Client-NodeJS]: https://github.com/EventStore/EventStore-Client-NodeJS
[ci-badge]: https://github.com/EventStore/EventStore-Client-NodeJS/workflows/CI/badge.svg?branch=master
[ci-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/actions