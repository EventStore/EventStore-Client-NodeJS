import { collect, createTestNode, delay } from "@test-utils";

import {
  KurrentDBClient,
  jsonEvent,
  StreamNotFoundError,
} from "@kurrent/db-client";

describe("createProjection", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  afterAll(async () => {
    await node.down();
  });

  test("defaults", async () => {
    const PROJECTION_NAME = "defaults";

    await expect(
      client.createProjection(
        PROJECTION_NAME,
        `
        fromAll()
          .when({
            $init: function (state, ev) {
              return {};
            }
          });
        `
      )
    ).resolves.toBeUndefined();
  });

  test("emitEnabled", async () => {
    const PROJECTION_NAME = "emit";
    const STREAM_NAME = "emit";
    const EVENT_TYPE = "emit_this";
    const EMIT_STREAMNAME = "emit_emitted";
    const EMIT_EVENT_TYPE = "emitted_this";
    const projection = `
      fromStream("${STREAM_NAME}")
        .when({
          ${EVENT_TYPE}(state, event) {
            emit("${EMIT_STREAMNAME}", "${EMIT_EVENT_TYPE}", {}, {});
          }
        });
    `;

    await client.createProjection(PROJECTION_NAME, projection, {
      emitEnabled: true,
    });

    await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: EVENT_TYPE, data: "anything" })
    );

    await delay(500);

    const [emitted] = await collect(client.readStream(EMIT_STREAMNAME));

    expect(emitted).toBeDefined();
    expect(emitted.event?.type).toBe(EMIT_EVENT_TYPE);

    try {
      for await (const e of client.readStream(
        `$projections-${PROJECTION_NAME}-emittedstreams`
      )) {
        expect(e).toBe("UNREACHABLE");
      }
    } catch (error) {
      expect(error).toBeInstanceOf(StreamNotFoundError);
    }
  });

  test("trackEmittedStreams", async () => {
    const PROJECTION_NAME = "track_and_field";
    const STREAM_NAME = "track_and_field";
    const EVENT_TYPE = "emit_this";
    const EMIT_STREAMNAME = "track_and_field_emitted";
    const EMIT_EVENT_TYPE = "emitted_this";
    const projection = `
      fromStream("${STREAM_NAME}")
        .when({
          ${EVENT_TYPE}(state, event) {
            emit("${EMIT_STREAMNAME}", "${EMIT_EVENT_TYPE}", {}, {});
          }
        });
    `;

    await client.createProjection(PROJECTION_NAME, projection, {
      emitEnabled: true,
      trackEmittedStreams: true,
    });

    await client.appendToStream(
      STREAM_NAME,
      jsonEvent({ type: EVENT_TYPE, data: "anything" })
    );

    await delay(500);

    const [emitted] = await collect(client.readStream(EMIT_STREAMNAME));

    expect(emitted).toBeDefined();
    expect(emitted.event?.type).toBe(EMIT_EVENT_TYPE);

    const [emittedStream] = await collect(
      client.readStream(`$projections-${PROJECTION_NAME}-emittedstreams`)
    );

    expect(emittedStream).toBeDefined();
    expect(emittedStream.event?.type).toBe("$StreamTracked");
  });
});
