import { Empty } from "../../generated/shared_pb";
import { CreateReq } from "../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../generated/persistent_grpc_pb";

import { BaseOptions, Filter } from "../types";
import { debug, convertToCommandError, UnsupportedError } from "../utils";
import { Client } from "../Client";
import { END, EVENT_TYPE, START, STREAM_NAME } from "../constants";

import { settingsToGRPC } from "./utils/settingsToGRPC";
import { PersistentSubscriptionToAllSettings } from "./utils/persistentSubscriptionSettings";

export interface CreateToPersistentSubscriptionToAllOptions
  extends BaseOptions {
  /**
   * Filters events or streams based upon a predicate.
   */
  filter?: Filter;
  /**
   * Skips server version check, possibly sending unsupported call to server.
   */
  skipVersionCheck?: boolean;
}

declare module "../Client" {
  interface Client {
    /**
     * Creates a persistent subscription to all. Persistent subscriptions are special kind of subscription where the
     * server remembers where the read offset is. This allows for many different modes of operations compared to a
     * regular subscription where the client holds the read offset. The group name must be unique.
     * Available from server version 21.10 onwards.
     * @param groupName A group name.
     * @param settings PersistentSubscription settings.
     * @see {@link persistentSubscriptionSettingsFromDefaults}
     * @param options Command options.
     */
    createPersistentSubscriptionToAll(
      groupName: string,
      settings: PersistentSubscriptionToAllSettings,
      options?: CreateToPersistentSubscriptionToAllOptions
    ): Promise<void>;
  }
}

Client.prototype.createPersistentSubscriptionToAll = async function (
  this: Client,
  groupName: string,
  settings: PersistentSubscriptionToAllSettings,
  {
    filter,
    skipVersionCheck = false,
    ...baseOptions
  }: CreateToPersistentSubscriptionToAllOptions = {}
): Promise<void> {
  if (!skipVersionCheck && (await this.versionMatches("<21.10"))) {
    throw new UnsupportedError("createPersistentSubscriptionToAll", "21.10");
  }

  const req = new CreateReq();
  const options = new CreateReq.Options();
  const allOptions = new CreateReq.AllOptions();
  const reqSettings = settingsToGRPC(settings, CreateReq.Settings);

  switch (settings.startFrom) {
    case START: {
      allOptions.setStart(new Empty());
      break;
    }
    case END: {
      allOptions.setEnd(new Empty());
      break;
    }
    default: {
      const position = new CreateReq.Position();
      position.setCommitPosition(settings.startFrom.commit.toString(10));
      position.setPreparePosition(settings.startFrom.prepare.toString(10));
      allOptions.setPosition(position);
      break;
    }
  }

  if (filter) {
    const filterOptions = new CreateReq.AllOptions.FilterOptions();
    const expression = new CreateReq.AllOptions.FilterOptions.Expression();

    if ("prefixes" in filter) {
      expression.setPrefixList(filter.prefixes);
    }

    if ("regex" in filter) {
      expression.setRegex(filter.regex);
    }

    switch (filter.filterOn) {
      case STREAM_NAME: {
        filterOptions.setStreamIdentifier(expression);
        break;
      }
      case EVENT_TYPE: {
        filterOptions.setEventType(expression);
        break;
      }
    }

    if (typeof filter.maxSearchWindow === "number") {
      if (filter.maxSearchWindow <= 0) {
        throw new Error("MaxSearchWindow must be greater than 0.");
      }
      filterOptions.setMax(filter.maxSearchWindow);
    } else {
      filterOptions.setCount(new Empty());
    }

    if (filter.checkpointInterval <= 0) {
      throw new Error("CheckpointInterval must be greater than 0.");
    }

    filterOptions.setCheckpointintervalmultiplier(filter.checkpointInterval);

    allOptions.setFilter(filterOptions);
  } else {
    allOptions.setNoFilter(new Empty());
  }

  options.setGroupName(groupName);
  options.setSettings(reqSettings);
  options.setAll(allOptions);

  req.setOptions(options);

  debug.command("createPersistentSubscriptionToAll: %O", {
    groupName,
    settings,
    options: { filter, ...baseOptions },
  });
  debug.command_grpc("createPersistentSubscriptionToAll: %g", req);

  return this.execute(
    PersistentSubscriptionsClient,
    "createPersistentSubscriptionToAll",
    (client) =>
      new Promise<void>((resolve, reject) => {
        client.create(req, ...this.callArguments(baseOptions), (error) => {
          if (error) return reject(convertToCommandError(error));
          return resolve();
        });
      })
  );
};
