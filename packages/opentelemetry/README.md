# OpenTelemetry EventStoreDB Instrumentation for Node.js

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

## License

Apache 2.0 - See [LICENSE] for more information.

[LICENSE]: https://opensource.org/licenses/Apache-2.0
[EventStore-Client-NodeJS]: https://github.com/EventStore/EventStore-Client-NodeJS
[Event Store Support]: https://eventstore.com/support/
[event store discuss]: https://discuss.eventstore.com/

## Support

Information on support can be found on our website: [Event Store Support]

## Community

We have a community discussion space at [Event Store Discuss].

## Contributing

Development is done on the `master` branch. We attempt to do our best to ensure that the history remains clean and to do so, we generally ask contributors to squash their commits into a set or single logical commit.