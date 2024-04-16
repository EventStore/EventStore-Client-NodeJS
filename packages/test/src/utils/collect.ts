import type { StreamingRead } from "@eventstore/db-client";

export const collect = async <
  T extends StreamingRead<unknown>,
  E = T extends StreamingRead<infer E> ? E : unknown
>(
  stream: T
): Promise<E[]> => {
  const collected = [];

  for await (const e of stream) {
    collected.push(e);
  }

  return collected as E[];
};
