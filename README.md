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

Server setup instructions can be found in the [Event Store Docs], follow the docker setup for the simplest configuration.

## Example

The following snippet showcases a simple example where we form a connection, then append and read events from the server.

###### Javascript example:

```javascript
const {
  EventStoreDBClient,
  jsonEvent,
  FORWARD,
  START,
} = require("@eventstore/db-client");

const client = new EventStoreDBClient({
  endpoint: "localhost:2113",
});

async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    eventType: "grpc-client",
    payload: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  const appendResult = await client.appendEventsToStream(streamName, [event]);

  const events = await client.readStream(streamName, 10, {
    fromRevision: START,
    direction: FORWARD,
  });

  events.forEach(doSomethingProductive);
}
```

###### Typescript example:

```typescript
import {
  EventStoreDBClient,
  jsonEvent,
  FORWARD,
  START,
} from "@eventstore/db-client";

const client = new EventStoreDBClient({
  endpoint: "localhost:2113",
});

async function simpleTest(): Promise<void> {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    eventType: "grpc-client",
    payload: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  const appendResult = await client.appendEventsToStream(streamName, [event]);

  const events = await client.readStream(streamName, 10, {
    fromRevision: START,
    direction: FORWARD,
  });

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

Tests can be filtered by prepending the test file or folder to the command

```shell script
$ yarn test connection // all connection tests
$ yarn test ReadAll // only the ReadAll tests
```

To get debug information when running tests use the `test:debug` command.

```shell script
$ yarn test:debug // debug all tests
$ yarn test:debug ReadAll // only the ReadAll tests
```

Specific docker images can be specified via the enviroment variable `EVENTSTORE_IMAGE`.

```shell script
$ yarn cross-env EVENTSTORE_IMAGE=77d63f3f0ab3 jest
```

See [Jest] documentation for more options.

## Debugging

This project uses the [debug] module internally to log information about connections, options and GRPC requests.
To see all the internal logs, set the DEBUG environment variable to `esdb:*` when launching your app.
Logs can be further filtered with glob patterns, for example, only connection logs: `esdb:connection`, everything but grpc logs: `esdb:*,-*:grpc`.

You can set a few environment variables that will further change the behavior of the debug logging:

| Name                | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_FD`          | File descriptor to write debug output to.         |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

**Note:** The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters.
See the Node.js documentation for [`util.inspect()`] for the complete list.

## Support

Information on support can be found on our website: [Event Store Support]

## Documentation

Documentation for EventStoreDB can be found in [Event Store Docs]

Bear in mind that this client is not yet properly documented. We are working hard on a new version of the documentation.

## Community

We have a community discussion space at [Event Store Discuss].

## Contributing

Development is done on the `master` branch. We attempt to do our best to ensure that the history remains clean and to do so, we generally ask contributors to squash their commits into a set or single logical commit.

[event store support]: https://eventstore.com/support/
[event store docs]: https://developers.eventstore.com/server/20.6/server/installation/
[event store discuss]: https://discuss.eventstore.com/
[yarn]: https://yarnpkg.com/
[jest]: https://jestjs.io/
[docker]: https://www.docker.com/
[docker compose]: https://docs.docker.com/compose/
[authenticate docker with a gitub personal access token]: https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-docker-for-use-with-github-packages#authenticating-with-a-personal-access-token
[debug]: https://github.com/visionmedia/debug
[`util.inspect()`]: https://nodejs.org/api/util.html#util_util_inspect_object_options
[npm-badge]: https://img.shields.io/npm/v/@eventstore/db-client.svg
[npm-badge-url]: https://www.npmjs.com/package/@eventstore/db-client
[ci-badge]: https://github.com/EventStore/EventStore-Client-NodeJS/workflows/CI/badge.svg?branch=master
[ci-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/actions
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE
