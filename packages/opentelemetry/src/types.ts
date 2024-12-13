import type * as kdb from "@eventstore/db-client";

export type SubscribeToStreamParameters = Parameters<
  kdb.KurrentDBClient["subscribeToStream"]
>;
export type SubscribeToAllParameters = Parameters<
  kdb.KurrentDBClient["subscribeToAll"]
>;
export type PersistentSubscribeToAllParameters = Parameters<
  kdb.KurrentDBClient["subscribeToPersistentSubscriptionToAll"]
>;
export type PersistentSubscribeToStreamParameters = Parameters<
  kdb.KurrentDBClient["subscribeToPersistentSubscriptionToStream"]
>;

export type SubscribeParameters =
  | SubscribeToStreamParameters
  | SubscribeToAllParameters;
export type PersistentSubscribeParameters =
  | PersistentSubscribeToStreamParameters
  | PersistentSubscribeToAllParameters;

export type AppendToStreamParams = Parameters<
  kdb.KurrentDBClient["appendToStream"]
>;
