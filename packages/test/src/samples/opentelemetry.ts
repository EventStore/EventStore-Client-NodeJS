// region import-required-packages
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { KurrentDBInstrumentation } from "@kurrent/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import {} from "@opentelemetry/sdk-trace-node";
// endregion import-required-packages
import { createTestNode } from "@test-utils";
import { KurrentDBClient } from "@kurrent/db-client";

import * as esdb from "@kurrent/db-client";

// region register-instrumentation
const provider = new NodeTracerProvider();

const instrumentation = new KurrentDBInstrumentation();

registerInstrumentations({
  instrumentations: [instrumentation],
  tracerProvider: provider,
});
// endregion register-instrumentation

instrumentation.disable();

describe("[sample] opentelemetry", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  // region setup-exporter
  const memoryExporter = new InMemorySpanExporter();
  const otlpExporter = new OTLPTraceExporter({ url: "http://localhost:4317" }); // change this to your OTLP receiver address
  const consoleExporter = new ConsoleSpanExporter();

  provider.addSpanProcessor(new SimpleSpanProcessor(memoryExporter));
  provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
  provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));
  // endregion setup-exporter

  // @ts-expect-error the moduleExports property is private. This is needed to make the test work with auto-mocking
  instrumentation._modules[0].moduleExports = esdb;

  beforeAll(async () => {
    await node.up();
    client = KurrentDBClient.connectionString(node.connectionString());
  });

  beforeAll(async () => {
    await node.up();
    instrumentation.enable();
  });

  afterAll(async () => {
    instrumentation.disable();
    await node.down();
  });

  afterEach(() => {
    memoryExporter.reset();
  });

  test("tracing", async () => {
    // region setup-client-for-tracing
    const { KurrentDBClient, jsonEvent } = await import("@kurrent/db-client");

    const client = KurrentDBClient.connectionString(node.connectionString());
    // endregion setup-client-for-tracing

    const response = await client.appendToStream(
      "some-stream",
      jsonEvent({
        type: "OrderPlaced",
        data: {
          orderId: "1337",
          orderValue: 123.45,
        },
      }),
      {
        expectedRevision: "any",
      }
    );

    expect(response).toBeDefined();

    const memorySpans = memoryExporter.getFinishedSpans();

    expect(memorySpans.length).toBe(1);
  });
});
