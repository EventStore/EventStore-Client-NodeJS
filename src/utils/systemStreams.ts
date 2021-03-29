/**
 * Returns true if the stream is a system stream.
 * @param streamId The stream id to test against.
 */
export const isSystemStream = (streamId: string): boolean =>
  streamId[0] === "$";

/**
 * Returns true if the stream is a metadata stream.
 * @param streamId The stream id to test against.
 */
export const isMetastream = (streamId: string): boolean =>
  streamId.slice(0, 2) == "$$";

/**
 * Returns the metadata stream of the stream.
 * @param streamId The stream id to get the metastream name of.
 */
export const metastreamOf = (streamId: string): string => `$$${streamId}`;

/**
 * Returns the original stream of the metadata stream.
 * @param metastreamId The metastream id to get the original stream name of.
 */
export const originalStreamOf = (metastreamId: string): string =>
  metastreamId.slice(2);
