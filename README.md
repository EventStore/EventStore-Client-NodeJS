# EventStoreDB NodeJS Client


[![license][license-badge]][license-badge-url]

EventStoreDB is the event-native database, where business events are immutably stored and streamed. Designed for event-sourced, event-driven, and microservices architectures.

## Packages

This monorepo contains the following packages:

| Subfolder                                            | Package                                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`packages/db-client/`](packages/db-client/)         | [`@eventstore/client`](https://www.npmjs.com/package/@eventstore/db-client)            |
| [`packages/opentelemetry/`](packages/opentelemetry/) | [`@eventstore/opentelemetry`](https://www.npmjs.com/package/@eventstore/opentelemetry) |
| [`packages/test/`](packages/test/)                   | Internal tests                                                                         |

## Support

Information on support can be found on our website: [Event Store Support]

## Communities

- [Discuss]
- [Discord (Event Store)][discord-event-store]
- [Discord (ddd-cqrs-es)][discord-ddd-cqrs-es]

## Contributing

Refer to our [Contribution Guidelines]

[event store support]: https://eventstore.com/support/
[discuss]: https://discuss.eventstore.com/
[discord-event-store]: https://discord.gg/Phn9pmCw3t
[discord-ddd-cqrs-es]: https://discord.com/invite/sEZGSHNNbH
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE
[contribution guidelines]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/CONTRIBUTING.md
