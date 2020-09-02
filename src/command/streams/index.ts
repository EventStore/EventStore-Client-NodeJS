import { ReadStreamEvents } from "./ReadStreamEvents";
import { WriteEvents } from "./WriteEvents";
import { DeleteStream } from "./DeleteStream";
import { TombstoneStream } from "./TombstoneStream";
import { ReadAllEvents } from "./ReadAllEvents";
import { SubscribeToStream } from "./SubscribeToStream";
import { SubscribeToAll } from "./SubscribeToAll";

/**
 * Sends events to a given stream.
 * @param stream A stream name.
 */
export const writeEvents = (stream: string): WriteEvents =>
  new WriteEvents(stream);

/**
 * Soft-deletes a stream.
 * @param stream A Stream name.
 */
export const deleteStream = (stream: string): DeleteStream =>
  new DeleteStream(stream);

/**
 * Hard-deletes a stream.
 * @param stream A stream name.
 */
export const tombstoneStream = (stream: string): TombstoneStream =>
  new TombstoneStream(stream);

/**
 * Reads events from a stream. You can read forward or backward.
 * @param stream A Stream name.
 */
export const readStreamEvents = (stream: string): ReadStreamEvents =>
  new ReadStreamEvents(stream);

/**
 * Reads events from the $all. You can read forward or backward. You might need to be authenticated to execute
 * that command successfully.
 */
export const readAllEvents = (): ReadAllEvents => new ReadAllEvents();

/**
 * Subscribes to a stream. You can specify a starting point, from the beginning, a specific revision or be at the
 * end of a stream. You will be notified of incoming events in a push fashion.
 * @param stream A stream name.
 */
export const subscribeToStream = (stream: string): SubscribeToStream =>
  new SubscribeToStream(stream);

/**
 * Same as {@link subscribe} but targets $all stream instead. You might need to be authenticated to execute that
 * command successfully.
 */
export const subscribeToAll = (): SubscribeToAll => new SubscribeToAll();
