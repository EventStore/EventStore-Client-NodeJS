import { z } from "zod";
import * as constants from "../constants";
import { ConsumerStrategy, Position } from "../types";
import {
  PersistentSubscriptionSettingsGeneric,
  PersistentSubscriptionToAllSettings,
  PersistentSubscriptionToStreamSettings,
} from "../persistentSubscription/utils/persistentSubscriptionSettings";
import { baseOptions, filter, position } from "./common";
import {
  CreatePersistentSubscriptionToAllOptions,
  DeletePersistentSubscriptionToAllOptions,
  DeletePersistentSubscriptionToStreamOptions,
  GetPersistentSubscriptionToAllInfoOptions,
  GetPersistentSubscriptionToStreamInfoOptions,
  ListPersistentSubscriptionsOptions,
  ListPersistentSubscriptionsToAllOptions,
  ListPersistentSubscriptionsToStreamOptions,
  ReplayParkedMessagesToAllOptions,
  ReplayParkedMessagesToStreamOptions,
  RestartPersistentSubscriptionSubsystemOptions,
  SubscribeToPersistentSubscriptionToAllOptions,
  SubscribeToPersistentSubscriptionToStreamOptions,
  UpdatePersistentSubscriptionToAllOptions,
} from "../persistentSubscription";

export const groupName = z.string();

export const consumerStrategy = z.union([
  z.literal(constants.DISPATCH_TO_SINGLE),
  z.literal(constants.ROUND_ROBIN),
  z.literal(constants.PINNED),
]) satisfies z.ZodType<ConsumerStrategy>;

export const persistentSubscriptionSettingsGeneric = z.object({
  resolveLinkTos: z.boolean(),
  extraStatistics: z.boolean(),
  messageTimeout: z.number().min(0),
  maxRetryCount: z.number().min(0),
  checkPointAfter: z.number().min(0),
  checkPointLowerBound: z.number().min(0),
  checkPointUpperBound: z.number().min(0),
  maxSubscriberCount: z.union([
    z.literal(constants.UNBOUNDED),
    z.number().min(0),
  ]),
  liveBufferSize: z.number().min(0),
  readBatchSize: z.number().min(0),
  historyBufferSize: z.number().min(0),
  consumerStrategyName: z.union([consumerStrategy, z.string()]),
}) satisfies z.ZodType<PersistentSubscriptionSettingsGeneric>;

export const startFrom = z.union([
  z.literal(constants.START),
  z.literal(constants.END),
  position,
]) satisfies z.ZodType<
  typeof constants.START | typeof constants.END | Position
>;

export const persistentSubscriptionToAllSettings =
  persistentSubscriptionSettingsGeneric.extend({
    startFrom,
  }) satisfies z.ZodType<PersistentSubscriptionToAllSettings>;

export const createPersistentSubscriptionToAllOptions = baseOptions.extend({
  filter: filter.optional(),
}) satisfies z.ZodType<CreatePersistentSubscriptionToAllOptions>;

export const persistentSubscriptionToStreamSettings =
  persistentSubscriptionSettingsGeneric.extend({
    startFrom: z.union([
      z.literal(constants.START),
      z.literal(constants.END),
      z.bigint(),
    ]),
  }) satisfies z.ZodType<PersistentSubscriptionToStreamSettings>;

export const deletePersistentSubscriptionToAllOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<DeletePersistentSubscriptionToAllOptions>;

export const deletePersistentSubscriptionToStreamOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<DeletePersistentSubscriptionToStreamOptions>;

export const getPersistentSubscriptionToAllInfoOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<GetPersistentSubscriptionToAllInfoOptions>;

export const getPersistentSubscriptionToStreamInfoOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<GetPersistentSubscriptionToStreamInfoOptions>;

export const listPersistentSubscriptionsOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<ListPersistentSubscriptionsOptions>;

export const listPersistentSubscriptionsToAllOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<ListPersistentSubscriptionsToAllOptions>;

export const listPersistentSubscriptionsToStreamOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<ListPersistentSubscriptionsToStreamOptions>;

export const stopAt = z.union([z.number().min(0), z.bigint().min(BigInt(0))]);

export const replayParkedMessagesToAllOptions = baseOptions.extend({
  stopAt: stopAt.optional(),
}) satisfies z.ZodType<ReplayParkedMessagesToAllOptions>;

export const replayParkedMessagesToStreamOptions = baseOptions.extend({
  stopAt: stopAt.optional(),
}) satisfies z.ZodType<ReplayParkedMessagesToStreamOptions>;

export const restartPersistentSubscriptionSubsystemOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<RestartPersistentSubscriptionSubsystemOptions>;

export const subscribeToPersistentSubscriptionToAllOptions = baseOptions.extend(
  {
    bufferSize: z.number().min(0).optional().default(10),
  }
) satisfies z.ZodType<SubscribeToPersistentSubscriptionToAllOptions>;

export const updatePersistentSubscriptionToAllOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<UpdatePersistentSubscriptionToAllOptions>;

export const subscribeToPersistentSubscriptionToStreamOptions =
  baseOptions.extend({
    bufferSize: z.number().min(0).optional().default(10),
  }) satisfies z.ZodType<SubscribeToPersistentSubscriptionToStreamOptions>;
