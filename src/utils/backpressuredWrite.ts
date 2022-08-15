/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClientWritableStream } from "@grpc/grpc-js";

const cache = new WeakMap<ClientWritableStream<any>, BackpressureQueue<any>>();

interface QueueItem<T> {
  data: T;
  resolve: () => void;
  reject: (err: Error) => void;
}

class BackpressureQueue<T> {
  private stream: ClientWritableStream<T>;
  private queue: QueueItem<T>[] = [];
  private writing = false;

  constructor(stream: ClientWritableStream<T>) {
    this.stream = stream;
    this.stream.once("error", this.errorOut);
  }

  write = async (data: T) =>
    new Promise<void>((resolve, reject) => {
      this.queue.push({ data, resolve, reject });
      this.triggerWrite();
    });

  private triggerWrite = async () => {
    if (this.writing) return;

    this.writing = true;

    while (this.queue.length) {
      const { data, resolve } = this.queue.shift()!;

      const written = this.stream.write(data);

      if (!written) {
        await new Promise<void>((r) => this.stream.once("drain", r));
      }

      resolve();
    }

    this.cleanUp();
  };

  private errorOut = (err: Error) => {
    this.cleanUp();

    while (this.queue.length) {
      const { reject } = this.queue.shift()!;
      reject(err);
    }
  };

  private cleanUp = () => {
    this.stream.removeListener("error", this.errorOut);
    cache.delete(this.stream);
  };
}

export const backpressuredWrite = async <T>(
  stream: ClientWritableStream<T>,
  data: T
) => {
  if (!cache.has(stream)) {
    cache.set(stream, new BackpressureQueue<T>(stream));
  }

  await cache.get(stream)!.write(data);
};
