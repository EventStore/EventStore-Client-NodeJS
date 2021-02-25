import { EVENT_TYPE, STREAM_NAME } from "../constants";
import { FilterOn, Filter, RegexFilter, PrefixesFilter } from "../types";

interface FilterOptionsBase {
  /**
   * Sets how often the checkpointReached callback is called.
   * Must be greater than 0.
   * */
  checkpointInterval?: number;
  /**
   * The maximum number of events that are filtered out before the page is returned
   * Must be greater than 0, if supplied.
   * */
  maxSearchWindow?: number;
}

interface RegexOptions extends FilterOptionsBase {
  /**
   * A regex to filter by.
   * */
  regex: string;
}

interface PrefixesOptions extends FilterOptionsBase {
  /**
   * A list of prefixes to filter on.
   * */
  prefixes: string[];
}

interface PrefixesOptions
  extends Omit<PrefixesFilter, "filterOn" | "checkpointInterval"> {
  checkpointInterval?: Filter["checkpointInterval"];
}

export type FilterOptions = RegexOptions | PrefixesOptions;

const createFilterOn = (filterOn: FilterOn) => {
  function createFilter(options: RegexOptions): RegexFilter;
  function createFilter(options: PrefixesOptions): PrefixesFilter;
  function createFilter({
    checkpointInterval = 1,
    ...options
  }: FilterOptions): Filter {
    const filter: Record<string, unknown> = {
      filterOn,
      checkpointInterval,
    };

    if ("regex" in options) {
      filter.regex = options.regex;
    }

    if ("prefixes" in options) {
      filter.prefixes = options.prefixes;
    }

    if (options.maxSearchWindow != null) {
      filter.maxSearchWindow = options.maxSearchWindow;
    }

    return (filter as unknown) as Filter;
  }

  return createFilter;
};

export const streamNameFilter = createFilterOn(STREAM_NAME);
export const eventTypeFilter = createFilterOn(EVENT_TYPE);
export const excludeSystemEvents = (
  options: Omit<RegexOptions, "regex"> = {}
): RegexFilter => eventTypeFilter({ regex: "^[^$].*", ...options });
