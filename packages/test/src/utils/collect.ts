export const collect = async <
  T extends AsyncIterableIterator<unknown>,
  E = T extends AsyncIterableIterator<infer E> ? E : unknown
>(
  stream: T
): Promise<E[]> => {
  const collected = [];

  for await (const e of stream) {
    collected.push(e);
  }

  return collected as E[];
};
