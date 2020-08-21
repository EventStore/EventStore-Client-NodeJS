![Github action CI workflow](https://github.com/EventStore/EventStore-Client-NodeJS/workflows/CI/badge.svg?branch=master)

# EventStoreDB NodeJS Client

EventStoreDB is the open-source, functional database with Complex Event Processing in Javascript.

This is the repository for the NodeJS client for EventStoreDB 20+ and uses gRPC as the communication protocol.

## Example

The following snippet is not runnable as-is but showcases a simple example where we write and read events from the
server. This snippet expects the server to be started like this:

```shell script
# Server version 20.6.0.
$ eventstored --dev
```

```typescript
import { EventData, EventStoreConnection } from '@eventstore/db-client';

async function simpleExample(): void {
    const connection = EventStoreConnection.builder()
        .sslDevMode()
        .build("localhost:2113")
        .streams();

    const streamName = 'es_supported_clients';
    const evt = EventData.json('grpc-client', {
        languages: ['typescript', 'javascript'],
        runtime: "NodeJS"
    }).build();

    const writeResult = await connection
        .writeEvents(streamName)
        .send([evt]);

    const readResult = await connection
        .readStream(streamName)
        .fromStart()
        .forward()
        .execute(10);

    readResult.events!.forEach(doSomethingProductive);
}
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

[EventStoreDB Support]: https://eventstore.com/support/
[EventStoreDB Docs]: https://developers.eventstore.com/
[EventStoreDB Discuss]: https://discuss.eventstore.com/
