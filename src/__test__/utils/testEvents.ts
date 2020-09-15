import { EventData } from "../..";

export const testEvents = (count = 4, eventType = "test"): EventData[] =>
  Array.from({ length: count }, (_, i) =>
    EventData.json(eventType, {
      message: "test",
      index: i,
    }).build()
  );
