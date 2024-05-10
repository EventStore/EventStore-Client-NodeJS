/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { EventData, JSONEventData } from "@eventstore/db-client";

export function hasConvertGrpcEventMethod(
  obj: any
): obj is { convertGrpcEvent: Function } {
  return typeof obj.convertGrpcEvent === "function";
}

export function isJSONEventData(event: EventData): event is JSONEventData {
  return event.contentType === "application/json";
}
