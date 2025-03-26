/* eslint-disable @typescript-eslint/no-explicit-any */

import type { EventData, JSONEventData } from "@kurrent/kurrentdb-client";

export function hasConvertGrpcEventMethod(
  obj: any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): obj is { convertGrpcEvent: Function } {
  return typeof obj.convertGrpcEvent === "function";
}

export function isJSONEventData(event: EventData): event is JSONEventData {
  return event.contentType === "application/json";
}
