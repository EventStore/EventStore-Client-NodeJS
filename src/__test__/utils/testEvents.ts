import { EventData, jsonEvent, binaryEvent } from "../..";

export interface TestEventData {
  message: "test";
  index: number;
}

export const jsonTestEvents = (count = 4, type = "test"): EventData[] =>
  Array.from({ length: count }, (_, i) =>
    jsonEvent({
      type,
      data: {
        message: "test",
        index: i,
      },
    })
  );

export const binaryTestEvents = (count = 4, type = "test"): EventData[] =>
  Array.from({ length: count }, (_, i) =>
    binaryEvent({
      type,
      data: Buffer.from(`hello: ${i}`),
    })
  );
