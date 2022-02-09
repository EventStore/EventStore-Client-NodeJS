import { SubscriptionInfo } from "../../../generated/persistent_pb";
import { END, START, UNBOUNDED } from "../../constants";
import type { Position } from "../../types";
import {
  PersistentSubscriptionSettings,
  PersistentSubscriptionSettingsGeneric,
  PersistentSubscriptionToAllSettings,
} from "./persistentSubscriptionSettings";

export type ExtraStatisticsKey =
  | "mean"
  | "median"
  | "fastest"
  | "quintile 1"
  | "quintile 2"
  | "quintile 3"
  | "quintile 4"
  | "quintile 5"
  | "90%"
  | "95%"
  | "99%"
  | "99.5%"
  | "99.9%"
  | "highest";

export interface PersistentSubscriptionConnectionInfo {
  /** Origin of this connection. */
  from: string;
  /** Connection username. */
  username: string;
  /** The name of the connection. */
  connectionName: string;
  /** Average events per second on this connection. */
  averageItemsPerSecond: number;
  /** Total items on this connection. */
  totalItems: bigint;
  /** Number of items seen since last measurement on this connection (used as the basis for `averageItemsPerSecond`). */
  countSinceLastMeasurement: bigint;
  /** Number of available slots. */
  availableSlots: number;
  /** Number of in flight messages on this connection. */
  inFlightMessages: number;
  /** Timing measurements for the connection. Can be enabled with the `extraStatistics` setting. */
  extraStatistics?: Map<ExtraStatisticsKey, BigInt>;
}

interface PersistentSubscriptionStatsBase {
  /** Average number of events per second. */
  averagePerSecond: number;
  /** Total number of events processed by subscription. */
  totalItems: bigint;
  /** Number of events seen since last measurement on this connection (used as the basis for `averagePerSecond`). */
  countSinceLastMeasurement: bigint;
  /** Current in flight messages across all connections. */
  totalInFlightMessages: number;
  /** Number of events in the read buffer. */
  readBufferCount: number;
  /** Number of events in the live buffer. */
  liveBufferCount: bigint;
  /** Number of events in the retry buffer. */
  retryBufferCount: number;
  /** The current number of parked messages. */
  parkedMessageCount: bigint;
  /** Current number of outstanding messages. */
  outstandingMessagesCount: number;
}

export interface PersistentSubscriptionStats
  extends PersistentSubscriptionStatsBase {
  /** The revision of the last checkpoint. */
  lastCheckpointedEventRevision?: bigint;
  /** The revision of the last known event. */
  lastKnownEventRevision?: bigint;
}

export interface PersistentSubscriptionToAllStats
  extends PersistentSubscriptionStatsBase {
  /** The position of the last checkpoint. */
  lastCheckpointedEventPosition?: Position;
  /** The position of the last known event. */
  lastKnownEventPosition?: Position;
}

export interface PersistentSubscriptionInfo {
  /** The source of events for the subscription. */
  eventSource: string;
  /** The group name given on creation. */
  groupName: string;
  /** The current status of the subscription. */
  status: string;
  /** The settings used to create the persistant subscription. */
  settings: PersistentSubscriptionSettings;
  /** The settings used to create the persistant subscription. */
  stats: PersistentSubscriptionStats;
  /** Active connections to the subscription. */
  connections: PersistentSubscriptionConnectionInfo[];
}

export interface PersistentSubscriptionToAllInfo {
  /** The source of events for the subscription. */
  eventSource: "$all";
  /** The group name given on creation. */
  groupName: string;
  /** The current status of the subscription. */
  status: string;
  /** The settings used to create the persistant subscription. */
  settings: PersistentSubscriptionToAllSettings;
  /** The settings used to create the persistant subscription. */
  stats: PersistentSubscriptionToAllStats;
  /** Active connections to the subscription. */
  connections: PersistentSubscriptionConnectionInfo[];
}

export const mapPersistentSubscriptionInfo = (
  response: SubscriptionInfo
): PersistentSubscriptionInfo => ({
  eventSource: response.getEventSource(),
  groupName: response.getGroupName(),
  status: response.getStatus(),
  settings: mapSettings(response),
  connections: response.getConnectionsList().map(mapConnection),
  stats: mapStats(response),
});

export const mapPersistentSubscriptionToAllInfo = (
  response: SubscriptionInfo
): PersistentSubscriptionToAllInfo => ({
  eventSource: response.getEventSource() as "$all",
  groupName: response.getGroupName(),
  status: response.getStatus(),
  settings: mapToAllSettings(response),
  connections: response.getConnectionsList().map(mapConnection),
  stats: mapToAllStats(response),
});

const stringToRevision = (str: string): bigint | undefined => {
  if (!str.length) return undefined;
  return BigInt(str);
};

const stringToStartFromRevision = (
  startFrom: string
): PersistentSubscriptionSettings["startFrom"] => {
  switch (startFrom) {
    case "0":
      return START;
    case "-1":
      return END;
    default:
      return stringToRevision(startFrom)!;
  }
};

const positionRegex = /^C:(?<commit>[0-9]*)\/P:(?<prepare>[0-9]*)$/;
const stringToPosition = (str: string): Position | undefined => {
  if (!str.length) return undefined;
  const match = str.match(positionRegex);
  if (!match || !match.groups) return undefined;
  return {
    commit: BigInt(match.groups.commit),
    prepare: BigInt(match.groups.prepare),
  };
};

const stringToStartFromPostition = (
  startFrom: string
): PersistentSubscriptionToAllSettings["startFrom"] => {
  switch (startFrom) {
    case "C:0/P:0":
      return START;
    case "C:-1/P:-1":
      return END;
    default:
      return stringToPosition(startFrom)!;
  }
};

const mapMaxSubscriberCount = (count: number) => {
  if (count === 0) return UNBOUNDED;
  return count;
};

const mapSettingBase = (
  response: SubscriptionInfo
): PersistentSubscriptionSettingsGeneric => ({
  resolveLinkTos: response.getResolveLinkTos(),
  extraStatistics: response.getExtraStatistics(),
  messageTimeout: response.getMessageTimeoutMilliseconds(),
  maxRetryCount: response.getMaxRetryCount(),
  checkPointAfter: response.getCheckPointAfterMilliseconds(),
  checkPointLowerBound: response.getMinCheckPointCount(),
  checkPointUpperBound: response.getMaxCheckPointCount(),
  maxSubscriberCount: mapMaxSubscriberCount(response.getMaxSubscriberCount()),
  liveBufferSize: response.getLiveBufferSize(),
  readBatchSize: response.getReadBatchSize(),
  historyBufferSize: response.getBufferSize(),
  consumerStrategyName: response.getNamedConsumerStrategy(),
});

const mapSettings = (
  response: SubscriptionInfo
): PersistentSubscriptionSettings => ({
  ...mapSettingBase(response),
  startFrom: stringToStartFromRevision(response.getStartFrom()),
});

const mapToAllSettings = (
  response: SubscriptionInfo
): PersistentSubscriptionToAllSettings => ({
  ...mapSettingBase(response),
  startFrom: stringToStartFromPostition(response.getStartFrom()),
});

const mapConnection = (
  connection: SubscriptionInfo.ConnectionInfo
): PersistentSubscriptionConnectionInfo => ({
  from: connection.getFrom(),
  username: connection.getUsername(),
  averageItemsPerSecond: connection.getAverageItemsPerSecond(),
  totalItems: BigInt(connection.getTotalItems()),
  countSinceLastMeasurement: BigInt(connection.getCountSinceLastMeasurement()),
  extraStatistics: connection
    .getObservedMeasurementsList()
    .reduce<PersistentSubscriptionConnectionInfo["extraStatistics"]>(
      (acc, observedMeasurement) => {
        if (acc == null) acc = new Map();
        acc.set(
          observedMeasurement.getKey().toLowerCase() as ExtraStatisticsKey,
          BigInt(observedMeasurement.getValue())
        );
        return acc;
      },
      undefined
    ),
  availableSlots: connection.getAvailableSlots(),
  inFlightMessages: connection.getInFlightMessages(),
  connectionName: connection.getConnectionName(),
});

const mapStatsBase = (
  response: SubscriptionInfo
): PersistentSubscriptionStatsBase => ({
  averagePerSecond: response.getAveragePerSecond(),
  totalItems: BigInt(response.getTotalItems()),
  countSinceLastMeasurement: BigInt(response.getCountSinceLastMeasurement()),
  readBufferCount: response.getReadBufferCount(),
  liveBufferCount: BigInt(response.getLiveBufferCount()),
  retryBufferCount: response.getRetryBufferCount(),
  totalInFlightMessages: response.getTotalInFlightMessages(),
  outstandingMessagesCount: response.getOutstandingMessagesCount(),
  parkedMessageCount: BigInt(response.getParkedMessageCount()),
});

const mapStats = (response: SubscriptionInfo): PersistentSubscriptionStats => ({
  ...mapStatsBase(response),
  lastCheckpointedEventRevision: stringToRevision(
    response.getLastCheckpointedEventPosition()
  ),
  lastKnownEventRevision: stringToRevision(
    response.getLastKnownEventPosition()
  ),
});

const mapToAllStats = (
  response: SubscriptionInfo
): PersistentSubscriptionToAllStats => ({
  ...mapStatsBase(response),
  lastCheckpointedEventPosition: stringToPosition(
    response.getLastCheckpointedEventPosition()
  ),
  lastKnownEventPosition: stringToPosition(
    response.getLastKnownEventPosition()
  ),
});

export interface HTTPSubscriptionInfo {
  links: Array<{
    href: string;
    rel: string;
  }>;
  config: HTTPConfig;
  eventStreamId: string;
  groupName: string;
  status: string;
  averageItemsPerSecond: number;
  parkedMessageUri: string;
  parkedMessageCount?: number;
  getMessagesUri: string;
  totalItemsProcessed: number;
  countSinceLastMeasurement: number;
  lastProcessedEventNumber: number;
  lastKnownEventNumber: number;
  readBufferCount: number;
  liveBufferCount: number;
  retryBufferCount: number;
  totalInFlightMessages: number;
  outstandingMessagesCount: number;
  connections: HTTPConnectionInfo[];
}

interface HTTPConfig {
  resolveLinktos: boolean;
  startFrom: number;
  messageTimeoutMilliseconds: number;
  extraStatistics: boolean;
  maxRetryCount: number;
  liveBufferSize: number;
  bufferSize: number;
  readBatchSize: number;
  preferRoundRobin: boolean;
  checkPointAfterMilliseconds: number;
  minCheckPointCount: number;
  maxCheckPointCount: number;
  maxSubscriberCount: number;
  namedConsumerStrategy: string;
}

interface HTTPConnectionInfo {
  from: string;
  username: string;
  averageItemsPerSecond: number;
  totalItemsProcessed: number;
  countSinceLastMeasurement: number;
  extraStatistics: Array<{
    key: string;
    value: number;
  }>;
  availableSlots: number;
  inFlightMessages: number;
  connectionName: string;
}

export const mapHTTPPersistentSubscriptionInfo = (
  response: HTTPSubscriptionInfo
): PersistentSubscriptionInfo => ({
  eventSource: response.eventStreamId,
  groupName: response.groupName,
  status: response.status,
  settings: mapHTTPSettings(response),
  connections: response.connections.map(mapHTTPConnection),
  stats: mapHTTPStats(response),
});

const mapHTTPSettings = (
  response: HTTPSubscriptionInfo
): PersistentSubscriptionSettings => ({
  startFrom: mapHTTPStartFrom(response.config.startFrom),
  resolveLinkTos: response.config.resolveLinktos,
  extraStatistics: response.config.extraStatistics,
  messageTimeout: response.config.messageTimeoutMilliseconds,
  maxRetryCount: response.config.maxRetryCount,
  checkPointAfter: response.config.checkPointAfterMilliseconds,
  checkPointLowerBound: response.config.minCheckPointCount,
  checkPointUpperBound: response.config.maxCheckPointCount,
  maxSubscriberCount: mapMaxSubscriberCount(response.config.maxSubscriberCount),
  liveBufferSize: response.config.liveBufferSize,
  readBatchSize: response.config.readBatchSize,
  historyBufferSize: response.config.bufferSize,
  consumerStrategyName: response.config.namedConsumerStrategy,
});

const mapHTTPStartFrom = (
  startFrom: number
): PersistentSubscriptionSettings["startFrom"] => {
  switch (startFrom) {
    case 0:
      return START;
    case -1:
      return END;
    default:
      return BigInt(startFrom);
  }
};

const mapHTTPStats = (response: HTTPSubscriptionInfo) => ({
  averagePerSecond: response.averageItemsPerSecond,
  totalItems: BigInt(response.totalItemsProcessed),
  countSinceLastMeasurement: BigInt(response.countSinceLastMeasurement),
  readBufferCount: response.readBufferCount,
  liveBufferCount: BigInt(response.liveBufferCount),
  retryBufferCount: response.retryBufferCount,
  totalInFlightMessages: response.totalInFlightMessages,
  outstandingMessagesCount: response.outstandingMessagesCount,
  parkedMessageCount: BigInt(response.parkedMessageCount ?? 0),
  lastCheckpointedEventRevision:
    response.lastProcessedEventNumber < 0
      ? undefined
      : BigInt(response.lastProcessedEventNumber),
  lastKnownEventRevision:
    response.lastKnownEventNumber < 0
      ? undefined
      : BigInt(response.lastKnownEventNumber),
});

const mapHTTPConnection = (
  connection: HTTPConnectionInfo
): PersistentSubscriptionConnectionInfo => ({
  from: connection.from,
  username: connection.username,
  connectionName: connection.connectionName,
  averageItemsPerSecond: connection.averageItemsPerSecond,
  totalItems: BigInt(connection.totalItemsProcessed),
  countSinceLastMeasurement: BigInt(connection.countSinceLastMeasurement),
  availableSlots: connection.availableSlots,
  inFlightMessages: connection.inFlightMessages,
  extraStatistics: connection.extraStatistics.reduce<
    PersistentSubscriptionConnectionInfo["extraStatistics"]
  >((acc, { key, value }) => {
    if (acc == null) acc = new Map();
    acc.set(key.toLowerCase() as ExtraStatisticsKey, BigInt(value));
    return acc;
  }, undefined),
});
