import { EventData, jsonEvent, binaryEvent } from "../..";

export interface TestEventData {
  message: "test";
  index: number;
}

export const jsonTestEvents = (count = 4, eventType = "test"): EventData[] =>
  Array.from({ length: count }, (_, i) =>
    jsonEvent({
      eventType,
      payload: {
        message: "test",
        index: i,
      },
    })
  );

export const binaryTestEvents = (count = 4, eventType = "test"): EventData[] =>
  Array.from({ length: count }, (_, i) =>
    binaryEvent({
      eventType,
      payload: Buffer.from(`hello: ${i}`),
    })
  );
