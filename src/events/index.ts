import { BinaryEventData } from "./binaryEvent";
import { JSONEventData } from "./jsonEvent";

export type EventData = JSONEventData | BinaryEventData;

export * from "./binaryEvent";
export * from "./jsonEvent";
