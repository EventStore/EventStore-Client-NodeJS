import { createTestNode, testEvents } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  getProjectionState,
  writeEventsToStream,
  UnknownError,
} from "../..";

describe("getProjectionState", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

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
    connection = EventStoreConnection.builder()
      .defaultCredentials({ username: "admin", password: "changeit" })
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);
  });

  afterAll(async () => {
    await node.down();
  });

  test("gets the state of a projection", async () => {
    const PROJECTION_NAME = "count events";
    const count = 3;

    await createContinuousProjection(PROJECTION_NAME, projection).execute(
      connection
    );

    await writeEventsToStream(STREAM_NAME)
      .send(...testEvents(count, EVENT_TYPE))
      .execute(connection);

    const state = await getProjectionState<number>(PROJECTION_NAME).execute(
      connection
    );

    expect(state).toBe(count);
  });

  test("projection doesnt exist", async () => {
    const PROJECTION_NAME = "doesnt exist";

    await expect(
      getProjectionState(PROJECTION_NAME).execute(connection)
    ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
  });
});
