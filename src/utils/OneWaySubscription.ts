import { Transform, TransformCallback, TransformOptions } from "stream";

import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";

import { ReadResp } from "../../generated/streams_pb";

import { ConvertGrpcEvent, convertToCommandError } from ".";
import { ReadableSubscription } from "../types";

type CreateGRPCStream = () => Promise<ClientReadableStream<ReadResp>>;

export class OneWaySubscription<E>
  extends Transform
  implements ReadableSubscription<E> {
  #convertGrpcEvent: ConvertGrpcEvent<E>;
  #grpcStream: Promise<ClientReadableStream<ReadResp>>;

  constructor(
    createGRPCStream: CreateGRPCStream,
    convertGrpcEvent: ConvertGrpcEvent<E>,
    options: TransformOptions
  ) {
    super({ ...options, objectMode: true });
    this.#convertGrpcEvent = convertGrpcEvent;
    this.#grpcStream = createGRPCStream();
    this.initialize();
  }

  private initialize = async () => {
    try {
      (await this.#grpcStream)
        .on("error", (err: ServiceError) => {
          if (err.code === Status.CANCELLED) return;
          const error = convertToCommandError(err);
          this.emit("error", error);
        })
        .pipe(this);
    } catch (error) {
      this.emit("error", error);
    }
  };

  _transform(resp: ReadResp, _encoding: string, next: TransformCallback): void {
    if (resp.hasConfirmation?.()) {
      this.emit("confirmation");
    }

    if (resp.hasEvent?.()) {
      const resolved = this.#convertGrpcEvent(resp.getEvent()!);
      return next(null, resolved);
    }

    next();
  }

  public async unsubscribe(): Promise<void> {
    const stream = await this.#grpcStream;

    return new Promise((resolve) => {
      // https://github.com/grpc/grpc-node/issues/1464
      // https://github.com/grpc/grpc-node/issues/1652
      setImmediate(() => {
        stream.cancel();
        resolve();
      });
    });
  }
}
