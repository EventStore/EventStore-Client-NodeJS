import {
  EventStoreDBClient,
  jsonEvent,
  START,
  FORWARDS,
  JSONEventType,
} from "@eventstore/db-client";
import { optionalDescribe } from "@test-utils";
import { v4 as uuid } from "uuid";

const CLOUD_ID = process.env.EVENTSTORE_CLOUD_ID!;
const STREAM_NAME = uuid();

/*
// region createClient
const client = EventStoreDBClient.connectionString`{connectionString}`;
// endregion createClient
*/

optionalDescribe(!!CLOUD_ID)("[sample] get-started", () => {
  test("get-started", async () => {
    const client = EventStoreDBClient.connectionString`esdb+discover://${CLOUD_ID}.mesdb.eventstore.cloud`;

    // region createEvent
    type TestEvent = JSONEventType<
      "TestEvent",
      {
        entityId: string;
        importantData: string;
      }
    >;

    const event = jsonEvent<TestEvent>({
      type: "TestEvent",
      data: {
        entityId: uuid(),
        importantData: "I wrote my first event!",
      },
    });
    // endregion createEvent

    // region appendEvents
    await client.appendToStream(STREAM_NAME, event);
    // endregion appendEvents

    // region readStream
    const events = await client.readStream<TestEvent>(STREAM_NAME, {
      direction: FORWARDS,
      fromRevision: START,
      maxCount: 10,
    });
    // endregion readStream

    for await (const resolvedEvent of events) {
      expect(resolvedEvent.event?.data.importantData).toBe(
        event.data.importantData
      );
    }
  });
});
