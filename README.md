[![npm][npm-badge]][npm-badge-url]
[![Github action CI workflow][ci-badge]][ci-badge-url]
[![license][license-badge]][license-badge-url]

# EventStoreDB NodeJS Client

EventStoreDB is the open-source, functional database with Complex Event Processing in Javascript.

This is the repository for the NodeJS client for EventStoreDB 20+ and uses gRPC as the communication protocol.

Note: This client is currently under active development and further API changes are expected. Feedback is very welcome.

## Installation

```shell script
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```

## EventStoreDB Server Compatibility

This client is compatible with version `20.6.1` upwards.

Server setup instructions can be found here [EventStoreDB Docs], follow the docker setup for the simplest configuration.

## Example

The following snippet showcases a simple example where we form a connection, then write and read events from the server.

###### Javascript example:

```javascript
const {
  EventData,
  EventStoreConnection,
  writeEventsToStream,
  readEventsFromStream,
} = require("@eventstore/db-client");

const connection = EventStoreConnection.builder()
  .insecure()
  .singleNodeConnection("localhost:2113");

async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = EventData.json("grpc-client", {
    languages: ["typescript", "javascript"],
    runtime: "NodeJS",
  }).build();

  const writeResult = await writeEventsToStream(streamName)
    .send(event)
    .execute(connection);

  const events = await readEventsFromStream(streamName)
    .fromStart()
    .forward()
    .count(10)
    .execute(connection);

  events.forEach(doSomethingProductive);
}
```

###### Typescript example:

```typescript
import {
  EventData,
  EventStoreConnection,
  writeEventsToStream,
  readEventsFromStream,
} from "@eventstore/db-client";

const connection = EventStoreConnection.builder()
  .insecure()
  .singleNodeConnection("localhost:2113");

async function simpleTest(): Promise<void> {
  const streamName = "es_supported_clients";

  const event = EventData.json("grpc-client", {
    languages: ["typescript", "javascript"],
    runtime: "NodeJS",
  }).build();

  const writeResult = await writeEventsToStream(streamName)
    .send(event)
    .execute(connection);

  const events = await readEventsFromStream(streamName)
    .fromStart()
    .forward()
    .count(10)
    .execute(connection);

  events.forEach(doSomethingProductive);
}
```

## Build from source

This project uses [Yarn] as a build tool. The following shell command lines should get you started:

```shell script
$ yarn
$ yarn build
```

## Run tests

Tests are written using [Jest] and require [Docker] and [Docker Compose] to be installed.
To access the github packages docker images, you need to [authenticate docker with a gitub personal access token].

```shell script
$ yarn test
```

Specific docker images can be specified via the enviroment variable `EVENTSTORE_IMAGE`.

```shell script
$ yarn cross-env EVENTSTORE_IMAGE=77d63f3f0ab3 jest
```

## Support

Information on support can be found here: [EventStoreDB Support]

## Documentation

Documentation for EventStoreDB can be found here: [EventStoreDB Docs]

Bear in mind that this client is not yet properly documented. We are working hard on a new version of the documentation.

## Community

We have a community discussion space at [EventStoreDB Discuss].

## Contributing

Development is done on the `master` branch. We attempt to do our best to ensure that the history remains clean and to do so, we generally ask contributors to squash their commits into a set or single logical commit.

[eventstoredb support]: https://eventstore.com/support/
[eventstoredb docs]: https://developers.eventstore.com/server/20.6/server/installation/
[eventstoredb discuss]: https://discuss.eventstore.com/
[yarn]: https://yarnpkg.com/
[jest]: https://jestjs.io/
[docker]: https://www.docker.com/
[docker compose]: https://docs.docker.com/compose/
[authenticate docker with a gitub personal access token]: https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-docker-for-use-with-github-packages#authenticating-with-a-personal-access-token
[npm-badge]: https://img.shields.io/npm/v/@eventstore/db-client.svg
[npm-badge-url]: https://www.npmjs.com/package/@eventstore/db-client
[ci-badge]: https://github.com/EventStore/EventStore-Client-NodeJS/workflows/CI/badge.svg?branch=master
[ci-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/actions
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE
