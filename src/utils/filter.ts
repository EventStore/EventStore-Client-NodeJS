import { EVENT_TYPE, STREAM_NAME } from "../constants";
import { FilterOn, Filter } from "../types";

const createFilter = (filterOn: FilterOn) => (
  options: Omit<Filter, "filterOn">
): Filter => ({
  filterOn,
  ...options,
});

export const streamNameFilter = createFilter(STREAM_NAME);
export const eventTypeFilter = createFilter(EVENT_TYPE);
