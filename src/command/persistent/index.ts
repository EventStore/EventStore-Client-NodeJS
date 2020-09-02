import { CreatePersistentSubscription } from "./CreatePersistentSubscription";
import { UpdatePersistentSubscription } from "./UpdatePersistentSubscription";
import { DeletePersistentSubscription } from "./DeletePersistentSubscription";
import { ConnectToPersistentSubscription } from "./ConnectToPersistentSubscription";

/**
 * Creates a persistent subscription on a stream. Persistent subscriptions are special kind of subscription where the
 * server remembers where the read offset is at. This allows for many different modes of operations compared to a
 * regular subscription where the client holds the read offset. The pair stream name and group must be unique.
 * @param stream A stream name.
 * @param group
 */
export const createPersistentSubscription = (
  stream: string,
  group: string
): CreatePersistentSubscription =>
  new CreatePersistentSubscription(stream, group);

/**
 * Updates a persistent subscription configuration.
 * @param stream A stream name.
 * @param group
 */
export const updatePersistentSubscription = (
  stream: string,
  group: string
): UpdatePersistentSubscription =>
  new UpdatePersistentSubscription(stream, group);

/**
 * Deletes a persistent subscription.
 * @param stream A stream name.
 * @param group
 */
export const deletePersistentSubscription = (
  stream: string,
  group: string
): DeletePersistentSubscription =>
  new DeletePersistentSubscription(stream, group);

/**
 * Connects to a persistent subscription.
 * @param stream A stream name.
 * @param group
 */
export const subscribePersistentSubscription = (
  stream: string,
  group: string
): ConnectToPersistentSubscription =>
  new ConnectToPersistentSubscription(stream, group);
