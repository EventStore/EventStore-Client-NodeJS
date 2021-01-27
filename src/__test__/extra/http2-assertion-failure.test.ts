import { v4 as uuid } from "uuid";
import { createInsecureTestNode, delay, jsonTestEvents } from "../utils";

import { EventStoreDBClient, NO_STREAM, ResolvedEvent, START } from "../..";

describe("http2 assertion failure", () => {
  const node = createInsecureTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();

    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { insecure: true },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  it("can subscribe to a stream", async () => {
    for (let i = 0; i < 80; i++) {
      const stream = `test_${uuid().replace(/-/g, "")}`;
      const priorEvents = jsonTestEvents(3);
      const postEvents = jsonTestEvents(7);

      const appendRes = await client.appendToStream(stream, priorEvents, {
        expectedRevision: NO_STREAM,
      });

      const received: ResolvedEvent[] = [];
      const sub = client.subscribeToStream(stream, {
        fromRevision: START,
      });
      sub.on("error", (err) => {
        console.log(err, err?.message);
        throw err;
      });
      sub.on("close", () => {
        // subscription stopped
      });
      sub.on("data", (evt) => {
        received.push(evt);
      });
      while (received.length < 3) await delay(10);
      await client.appendToStream(stream, postEvents, {
        expectedRevision: appendRes.nextExpectedRevision,
      });

      while (received.length < 10) await delay(10);
      expect(received.map((e) => e.event?.id)).toStrictEqual(
        [...priorEvents, ...postEvents].map((e) => e.id)
      );
      await sub.unsubscribe();
    }
  });
});
