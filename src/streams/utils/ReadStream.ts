import { Transform, TransformCallback, TransformOptions } from "stream";

import type { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";

import type { ReadResp } from "../../../generated/streams_pb";

import type { StreamingRead } from "../../types";
import {
  ConvertGrpcEvent,
  convertToCommandError,
  StreamNotFoundError,
} from "../../utils";

type CreateGRPCStream = () => Promise<ClientReadableStream<ReadResp>>;

export class ReadStream<E> extends Transform implements StreamingRead<E> {
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

    if (resp.hasStreamNotFound?.()) {
      const streamNotFound = resp.getStreamNotFound()!;

      this.emit(
        "error",
        new StreamNotFoundError(
          null as never,
          streamNotFound.getStreamIdentifier()?.getStreamName()
        )
      );
    }

    if (resp.hasEvent?.()) {
      const resolved = this.#convertGrpcEvent(resp.getEvent()!);
      return next(null, resolved);
    }

    next();
  }

  public async cancel(): Promise<void> {
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
