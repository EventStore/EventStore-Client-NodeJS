import { createTestNode, delay, jsonTestEvents } from "../utils";

import { EventStoreDBClient, UnknownError } from "../..";

describe("getProjectionState", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  const EVENT_TYPE = "count_this";
  const STREAM_NAME = "some_stream_name";
  const projection = `
  fromStream("${STREAM_NAME}")
    .when({
      $init() {
        return 0;
      },
      ${EVENT_TYPE}(state, event) {
        return state + 1
      }
    });
  `;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.rootCertificate },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("gets the state of a projection", async () => {
    const PROJECTION_NAME = "count events";
    const count = 3;

    await client.createContinuousProjection(PROJECTION_NAME, projection);

    await client.writeEventsToStream(
      STREAM_NAME,
      jsonTestEvents(count, EVENT_TYPE)
    );

    await delay(5000);

    const state = await client.getProjectionState<number>(PROJECTION_NAME);

    expect(state).toBe(count);
  });

  test("projection doesnt exist", async () => {
    const PROJECTION_NAME = "doesnt exist";

    await expect(
      client.getProjectionState(PROJECTION_NAME)
    ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
  });
});
