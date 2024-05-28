// region import-required-packages
import {
  InMemorySpanExporter,
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { EventStoreDBInstrumentation } from "@eventstore/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import {} from "@opentelemetry/sdk-trace-node";
// endregion import-required-packages
import { createTestNode } from "@test-utils";
import { EventStoreDBClient } from "@eventstore/db-client";

import * as esdb from "@eventstore/db-client";

// region register-instrumentation
const provider = new NodeTracerProvider();

const instrumentation = new EventStoreDBInstrumentation();

registerInstrumentations({
  instrumentations: [instrumentation],
  tracerProvider: provider,
});
// endregion register-instrumentation

instrumentation.disable();

describe("[sample] opentelemetry", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

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
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
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
    const { EventStoreDBClient, jsonEvent } = await import(
      "@eventstore/db-client"
    );

    const client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
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
