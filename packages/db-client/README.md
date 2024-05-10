# @eventstore/db-client

[![npm][npm-badge]][npm-badge-url]
[![Github action CI workflow][ci-badge]][ci-badge-url]
[![license][license-badge]][license-badge-url]

This is the package for the NodeJS client for EventStoreDB 20+ and uses gRPC as the communication protocol.

## Installation

```shell script
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```

## EventStoreDB Server Compatibility

This client is compatible with version `20.6.1` upwards.

Server setup instructions can be found under the installation section of the [Event Store Docs]. Follow the Docker setup for the simplest configuration.

## Example

The following snippet showcases a simple example where we form a connection, then append and read events from the server.

###### Javascript example:

```javascript
const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} = require('@eventstore/db-client');

const client = new EventStoreDBClient({
  endpoint: "localhost:2113",
});

async function simpleTest() {
  const streamName = "es_supported_clients";

  const event = jsonEvent({
    type: "grpc-client",
    data: {
      languages: ["typescript", "javascript"],
      runtime: "NodeJS",
    },
  });

  const appendResult = await client.appendToStream(streamName, [event]);

    // read the event
    const events = client.readStream(streamName, {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 10,
    });

    for await (const { event } of events) {
      console.log('Appended event: ', event);
    }
  } catch (error) {
    console.error('An error occured: ', error);
  } finally {
    await client.dispose();
  }
})();
```

###### Typescript example:

```typescript
import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
  JSONEventType,
} from '@eventstore/db-client';

const client = new EventStoreDBClient({
  endpoint: 'localhost:2113',
});

interface Reservation {
  reservationId: string;
  movieId: string;
  userId: string;
  seatId: string;
}

type SeatReservedEvent = JSONEventType<
  'seat-reserved',
  {
    reservationId: string;
    movieId: string;
    userId: string;
    seatId: string;
  }
>;

type SeatChangedEvent = JSONEventType<
  'seat-changed',
  {
    reservationId: string;
    newSeatId: string;
  }
>;

type ReservationEvents = SeatReservedEvent | SeatChangedEvent;

async function simpleTest(): Promise<void> {
  const streamName = 'booking-abc123';

  const event = jsonEvent<SeatReservedEvent>({
    type: 'seat-reserved',
    data: {
      reservationId: 'abc123',
      movieId: 'tt0368226',
      userId: 'nm0802995',
      seatId: '4b',
    },
  });

  const appendResult = await client.appendToStream<ReservationEvents>(
    streamName,
    event
  );

  // By reading the events in the stream, we can construct the current state of the booking

  interface Reservation {
    reservationId: string;
    movieId: string;
    userId: string;
    seatId: string;
  }

  const events = client.readStream<ReservationEvents>(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });

  const reservation: Partial<Reservation> = {};

  for await (const { event } of events) {
    switch (event.type) {
      case 'seat-reserved': {
        reservation.reservationId = event.data.reservationId;
        reservation.movieId = event.data.movieId;
        reservation.seatId = event.data.seatId;
        reservation.userId = event.data.userId;
        break;
      }
      case 'seat-changed': {
        reservation.seatId = event.data.newSeatId;
        break;
      }
      default: {
        const _exhaustiveCheck: never = event;
        break;
      }
    }
  }
}

// Do something with our reservation
console.log(reservation);
```

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
[npm-badge]: https://img.shields.io/npm/v/@eventstore/db-client.svg
[npm-badge-url]: https://www.npmjs.com/package/@eventstore/db-client
[ci-badge]: https://github.com/EventStore/EventStore-Client-NodeJS/workflows/CI/badge.svg?branch=master
[ci-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/actions
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE
[contribution guidelines]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/CONTRIBUTING.md
[event store docs]: https://developers.eventstore.com/server/v20.10/docs/installation/