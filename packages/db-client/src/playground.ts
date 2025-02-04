import { EventStoreDBClient, jsonEvent } from ".";
import { v4 } from "uuid";

(async () => {
  // const client = EventStoreDBClient.connectionString`esdb://localhost:2113?tls=false`;

  const client = new EventStoreDBClient(
    { endpoint: "localhost:2113" },
    { insecure: true }
  );

  const streamName = v4();

  await client.appendToStream(
    streamName,
    jsonEvent({
      type: "test",
      data: {
        message: "Hello, World!",
      },
    })
  );

  for await (const resolved of await client.readStreamFast(streamName, {
    fromRevision: BigInt(0),
    direction: "forwards",
    maxCount: BigInt(5),
    requiresLeader: true,
  })) {
    console.log(resolved);
  }

  await client.dispose();
})();
