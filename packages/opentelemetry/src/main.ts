import { EventStoreDBInstrumentation } from ".";

import {
  SimpleSpanProcessor,
  BasicTracerProvider,
  InMemorySpanExporter,
} from "@opentelemetry/sdk-trace-node";
import { context } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { v4 } from "uuid";
import { AsyncHooksContextManager } from "@opentelemetry/context-async-hooks";

const contextManager = new AsyncHooksContextManager().enable();

context.setGlobalContextManager(contextManager);

const inMemorySpanExporter = new InMemorySpanExporter();

const provider = new BasicTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(inMemorySpanExporter));

registerInstrumentations({
  instrumentations: [new EventStoreDBInstrumentation()],
  tracerProvider: provider,
});

provider.register();

(async () => {
  const { EventStoreDBClient, jsonEvent } = await import(
    "@eventstore/db-client"
  );

  const stream = v4();

  const client = EventStoreDBClient.connectionString(
    "esdb://admin:changeit@localhost:2113?tls=false"
  );
  try {
    const response = await client.appendToStream(
      stream,
      jsonEvent({
        type: "SomeEvent",
        data: {},
      }),
      {
        expectedRevision: "any",
      }
    );

    console.log(response);
    console.log("append spans", inMemorySpanExporter.getFinishedSpans());

    const sub = client
      .subscribeToStream(stream)
      .on("data", (event) => {
        console.log(event);
      })
      .on("caughtUp", async () => {
        console.log("subscribe spans", inMemorySpanExporter.getFinishedSpans());
        await sub.unsubscribe();
      });
  } finally {
    await client.dispose();
  }
})();
