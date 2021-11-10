import type { ClientWritableStream } from "@grpc/grpc-js";

export const backpressuredWrite = <T>(
  stream: ClientWritableStream<T>,
  data: T
) =>
  new Promise<void>((resolve) => {
    const written = stream.write(data);
    if (written) return resolve();
    stream.once("drain", resolve);
  });
