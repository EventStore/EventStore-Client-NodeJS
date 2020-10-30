import { createTestNode, delay, testEvents } from "../utils";

import {
  ESDBConnection,
  EventStoreConnection,
  createContinuousProjection,
  writeEventsToStream,
  UnknownError,
  getProjectionResult,
  EventData,
} from "../..";
import { enableProjection, getProjectionStatistics } from "../../command";
import { RUNNING } from "../../constants";

describe("getProjectionResult", () => {
  const node = createTestNode();
  let connection!: ESDBConnection;

  beforeAll(async () => {
    await node.up();
    connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri);

    await enableProjection("$by_category")
      .authenticated("admin", "changeit")
      .execute(connection);
  });

  afterAll(async () => {
    await node.down();
  });

  describe("gets the result of a projection", () => {
    test("without partition", async () => {
      const PROJECTION_NAME = "count events";
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

      const count = 12;

      await createContinuousProjection(PROJECTION_NAME, projection)
        .authenticated("admin", "changeit")
        .execute(connection);

      await writeEventsToStream(STREAM_NAME)
        .send(...testEvents(count, EVENT_TYPE))
        .execute(connection);

      const state = await getProjectionResult<number>(PROJECTION_NAME)
        .authenticated("admin", "changeit")
        .execute(connection);

      expect(state).toBe(count);
    });

    test("with partition", async () => {
      const PARTITION_PROJECTION_NAME = "partition_projection";
      const COUNTER_PROJECTION_NAME = "cat_activity_counter";

      const STREAM_NAME = "What cat is doing";

      const NAPPED_EVENT = "napped";
      const SNACKED_EVENT = "snacked";

      type CatActivity = typeof NAPPED_EVENT | typeof SNACKED_EVENT;
      type CatCounter = Record<CatActivity, number>;

      const SMUDGES = "Smudges";
      const PEANUT_BUTTER = "PeanutButter";
      const MR_WHISKERS = "MrWhiskers";

      const paritionProjection = `
        fromStream("${STREAM_NAME}")
          .when({
            $any: function(state, ev) {
              linkTo('cat-' + ev.data.catName, ev)
            }
          });
      `;

      const countProjection = `
        fromCategory('cat')
          .foreachStream()
          .when({
            "$init": function(state, ev) {
              return { naps: 0, snacks: 0 };
            },
            "${NAPPED_EVENT}": function(state, ev) {
              state.naps++;
            },
            "${SNACKED_EVENT}": function(state, ev) {
              state.snacks++;
            }
          });
      `;

      const createCatEvent = (catName: string, eventType: string) =>
        EventData.json(eventType, {
          catName,
        }).build();

      await createContinuousProjection(
        PARTITION_PROJECTION_NAME,
        paritionProjection
      )
        .trackEmittedStreams()
        .authenticated("admin", "changeit")
        .execute(connection);

      const partitionStats = await getProjectionStatistics(
        PARTITION_PROJECTION_NAME
      )
        .authenticated("admin", "changeit")
        .execute(connection);

      expect(partitionStats.projectionStatus).toBe(RUNNING);

      await createContinuousProjection(COUNTER_PROJECTION_NAME, countProjection)
        .authenticated("admin", "changeit")
        .execute(connection);

      const counterStats = await getProjectionStatistics(
        COUNTER_PROJECTION_NAME
      )
        .authenticated("admin", "changeit")
        .execute(connection);

      expect(counterStats.projectionStatus).toBe(RUNNING);

      const byCategoryStats = await getProjectionStatistics("$by_category")
        .authenticated("admin", "changeit")
        .execute(connection);

      expect(byCategoryStats.projectionStatus).toBe(RUNNING);

      await writeEventsToStream(STREAM_NAME)
        .send(
          createCatEvent(MR_WHISKERS, NAPPED_EVENT),
          createCatEvent(SMUDGES, NAPPED_EVENT),
          createCatEvent(MR_WHISKERS, SNACKED_EVENT),
          createCatEvent(PEANUT_BUTTER, NAPPED_EVENT),
          createCatEvent(MR_WHISKERS, NAPPED_EVENT),
          createCatEvent(PEANUT_BUTTER, SNACKED_EVENT)
        )
        .execute(connection);

      await delay(10000);

      const result = await getProjectionResult<CatCounter>(
        COUNTER_PROJECTION_NAME
      )
        .fromPartition(`cat-${MR_WHISKERS}`)
        .authenticated("admin", "changeit")
        .execute(connection);

      expect(result).toMatchObject({
        naps: 2,
        snacks: 1,
      });
    });
  });

  describe("errors", () => {
    test("projection doesnt exist", async () => {
      const PROJECTION_NAME = "doesnt exist";

      await expect(
        getProjectionResult(PROJECTION_NAME)
          .authenticated("admin", "changeit")
          .execute(connection)
      ).rejects.toThrowError(UnknownError); // https://github.com/EventStore/EventStore/issues/2732
    });
  });
});
