import type * as esdb from "@eventstore/db-client";

export type SubscribeToStreamParameters = Parameters<
  esdb.EventStoreDBClient["subscribeToStream"]
>;
export type SubscribeToAllParameters = Parameters<
  esdb.EventStoreDBClient["subscribeToAll"]
>;
export type PersistentSubscribeToAllParameters = Parameters<
  esdb.EventStoreDBClient["subscribeToPersistentSubscriptionToAll"]
>;
export type PersistentSubscribeToStreamParameters = Parameters<
  esdb.EventStoreDBClient["subscribeToPersistentSubscriptionToStream"]
>;

export type SubscribeParameters =
  | SubscribeToStreamParameters
  | SubscribeToAllParameters;
export type PersistentSubscribeParameters =
  | PersistentSubscribeToStreamParameters
  | PersistentSubscribeToAllParameters;

export type AppendToStreamParams = Parameters<
  esdb.EventStoreDBClient["appendToStream"]
>;
