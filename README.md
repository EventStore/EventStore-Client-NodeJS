# EventStoreDB NodeJS Client

[![license][license-badge]][license-badge-url]

EventStoreDB is the event-native database, where business events are immutably stored and streamed. Designed for event-sourced, event-driven, and microservices architectures.

## Packages

This monorepo contains the following packages:

| Subfolder                                    | Package                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| [`packages/db-client/`](packages/db-client/) | [`@eventstore/client`](https://www.npmjs.com/package/@eventstore/db-client) |
| [`packages/test/`](packages/test/)           | Client internal tests                                                       |

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

## Documentation

Full documentation can be found in [Event Store GRPC Client Docs].

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

const client = new EventStoreDBClient(
  {
    endpoint: 'localhost:2113',
  },
  { insecure: true }
);

(async () => {
  try {
    const streamName = 'booking-transactions';

    // define an event
    const event = jsonEvent({
      type: 'booking-initiated',
      data: {
        bookingId: 'booking-456',
        userId: 'user-789',
        event: 'Concert of The Rolling Stones',
        timestamp: new Date().toISOString(),
      },
      metadata: {
        createdByUserId: 'user-789',
        sourceIp: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    // append the event
    await client.appendToStream(streamName, [event]);

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
  type JSONEventType,
} from "@eventstore/db-client";

// Create a client to connect to EventStoreDB
const client = EventStoreDBClient.connectionString`esdb://localhost:2113`;

// Define the events that can occur during a booking

type SeatReservedEvent = JSONEventType<
  "seat-reserved",
  {
    reservationId: string;
    movieId: string;
    userId: string;
    seatId: string;
  }
>;

type SeatChangedEvent = JSONEventType<
  "seat-changed",
  {
    reservationId: string;
    newSeatId: string;
  }
>;

type ReservationEvents = SeatReservedEvent | SeatChangedEvent;

// Write events to a stream that describe the history of our booking

const streamName = "booking-abc123";

const event = jsonEvent<SeatReservedEvent>({
  type: "seat-reserved",
  data: {
    reservationId: "abc123",
    movieId: "tt0368226",
    userId: "nm0802995",
    seatId: "4b",
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
  switch (event?.type) {
    case "seat-reserved": {
      reservation.reservationId = event.data.reservationId;
      reservation.movieId = event.data.movieId;
      reservation.seatId = event.data.seatId;
      reservation.userId = event.data.userId;
      break;
    }
    case "seat-changed": {
      reservation.seatId = event.data.newSeatId;
      break;
    }
  }
}

// Do something with our reservation
console.log(reservation);
```


## Build from source

This project uses [Yarn] as a build tool. The following shell command lines should get you started:

```shell script
$ yarn
$ yarn build
```

## Support

Information on support can be found on our website: [Event Store Support]

## Communities

- [Discuss]
- [Discord (Event Store)][discord-event-store]
- [Discord (ddd-cqrs-es)][Discord-ddd-cqrs-es]

## Contributing

Refer to our [Contribution Guidelines]

[event store support]: https://eventstore.com/support/
[event store docs]: https://developers.eventstore.com/latest.html
[contribution guidelines]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/main/CONTRIBUTING.md
[discuss]: https://discuss.eventstore.com/
[discord-event-store]: https://discord.gg/Phn9pmCw3t
[Discord-ddd-cqrs-es]: https://discord.com/invite/sEZGSHNNbH
[event store grpc client docs]: https://developers.eventstore.com/clients/grpc
[event store discuss]: https://discuss.eventstore.com/
[yarn]: https://yarnpkg.com/
[license-badge]: https://img.shields.io/npm/l/@eventstore/db-client.svg
[license-badge-url]: https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/LICENSE