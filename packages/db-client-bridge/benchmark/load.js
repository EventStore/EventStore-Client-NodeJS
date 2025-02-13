const {EventStoreDBClient, jsonEvent} = require("@eventstore/db-client");

(async () => {
    const client = EventStoreDBClient.connectionString`esdb://localhost:2113?tls=false`;

    const events = Array.from({length: 10_000}, (_, i) =>
        jsonEvent({type: "test", data: {i, hello: "hi"}})
    );

    await client.appendToStream("my_stream_10_000", events);

    console.log("done");

    await client.dispose()
})()

