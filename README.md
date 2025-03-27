<a href="https://kurrent.io">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="KurrentLogo-White.png">
    <source media="(prefers-color-scheme: light)" srcset="KurrentLogo-Black.png">
    <img alt="Kurrent" src="KurrentLogo-Plum.png" height="50%" width="50%">
  </picture>
</a>

# KurrentDB NodeJS Client

[![license][license-badge]][license-badge-url]

KurrentDB is the event-native database, where business events are immutably
stored and streamed. Designed for event-sourced, event-driven, and microservices
architectures.

## Packages

This monorepo contains the following packages:

| Subfolder                                            | Package                                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`packages/db-client/`](packages/db-client/)         | [`@kurrent/client`](https://www.npmjs.com/package/@kurrent/kurrentdb-client)     |
| [`packages/opentelemetry/`](packages/opentelemetry/) | [`@kurrent/opentelemetry`](https://www.npmjs.com/package/@kurrent/opentelemetry) |
| [`packages/test/`](packages/test/)                   | Internal tests                                                                   |

The client uses [KurrentDB-Bridge-Client](https://github.com/kurrent-io/EventStore-Client-NodeJS) 
to significantly improve read performance by leveraging Rust through native addons. 

## Support

Information on support can be found on our website: [Kurrent Support]

## Communities

- [Discuss]
- [Discord (Kurrent)][discord-kurrent]
- [Discord (ddd-cqrs-es)][discord-ddd-cqrs-es]

## Contributing

Refer to our [Contribution Guidelines]

[Kurrent support]: https://kurrent.io/support/
[discuss]: https://discuss.kurrent.io/
[discord-kurrent]: https://discord.gg/Phn9pmCw3t
[discord-ddd-cqrs-es]: https://discord.com/invite/sEZGSHNNbH
[license-badge]: https://img.shields.io/npm/l/@kurrent/kurrentdb-client.svg
[license-badge-url]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/blob/master/LICENSE
[contribution guidelines]: https://github.com/kurrent-io/KurrentDB-Client-NodeJS/blob/master/CONTRIBUTING.md
