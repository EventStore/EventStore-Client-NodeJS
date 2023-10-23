import { validate as validateUUID } from "uuid";

import type { EventData, EventType } from "../types";
import { IsNotUUIDError } from "./IsNotUUIDError";

export const validateEventIds = (events: EventData<EventType>[]): void => {
  events.forEach((event) => {
    if (!validateUUID(event.id)) throw new IsNotUUIDError(event.id);
  });
};
