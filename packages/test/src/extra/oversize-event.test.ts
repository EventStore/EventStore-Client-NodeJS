import { createTestNode, delay, jsonTestEvents } from "@test-utils";
import {
  KurrentDBClient,
  jsonEvent,
  JSONEventType,
  RUNNING,
} from "@kurrent/db-client";

describe("oversize events", () => {
  const node = createTestNode();

  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    // await node.openInBrowser(false);
    await node.down();
  });

  test("oversize events", async () => {
    const STREAM_NAME = "big_event";
    const TRIGGER = "big_event_trigger";
    const FINISH_TEST = "big_event_finish_test";
    const PROJECTION_NAME = "big_event_projection";
    const doSomething = jest.fn();

    const BIG_EVENT = "big_event";
    const bigData = "r" + "e".repeat(15 * 1024 * 1024);

    type BigEvent = JSONEventType<
      typeof BIG_EVENT,
      { message: string },
      { message: string }
    >;

    const projection = `
    fromStream("${STREAM_NAME}")
      .when({
        $init() {
          return 0;
        },
        ${TRIGGER}() {
          emit("${STREAM_NAME}_emit", "${BIG_EVENT}", { message: "r" + "e".repeat(15 * 1024 * 1024) }, {});
        }
      });
`;

    await client.createProjection(PROJECTION_NAME, projection, {
      emitEnabled: true,
    });

    // give it a chance to get up and running
    await delay(1000);

    const state = await client.getProjectionStatus(PROJECTION_NAME);
    expect(state.projectionStatus).toBe(RUNNING);

    await client.appendToStream(STREAM_NAME, [
      jsonEvent({ type: TRIGGER, data: "hi" }),
      ...jsonTestEvents(5),
      jsonEvent({ type: FINISH_TEST, data: "hi" }),
    ]);

    // check that the big event hasn't blown it up
    const state2 = await client.getProjectionStatus(PROJECTION_NAME);
    expect(state2.projectionStatus).toBe(RUNNING);

    const subscription = client.subscribeToStream<BigEvent>(
      `${STREAM_NAME}_emit`
    );

    for await (const { event } of subscription) {
      if (event?.type !== BIG_EVENT) continue;
      doSomething(event);
      expect(event.data.message).toBe(bigData);
      break;
    }

    expect(doSomething).toBeCalled();
  });
});
