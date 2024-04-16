import { Transform, TransformCallback, TransformOptions } from "stream";

import type { ClientReadableStream, ServiceError } from "@grpc/grpc-js";

import type { ReadResp } from "../../../generated/streams_pb";

import type { Filter, Position, ReadableSubscription } from "../../types";
import {
  ConvertGrpcEvent,
  convertToCommandError,
  isClientCancellationError,
} from "../../utils";

type CreateGRPCStream = () => Promise<ClientReadableStream<ReadResp>>;

export class Subscription<E>
  extends Transform
  implements ReadableSubscription<E>
{
  #convertGrpcEvent: ConvertGrpcEvent<ReadResp.ReadEvent, E>;
  #grpcStream: Promise<ClientReadableStream<ReadResp>>;
  #checkpointReached?: Filter["checkpointReached"];

  constructor(
    createGRPCStream: CreateGRPCStream,
    convertGrpcEvent: ConvertGrpcEvent<ReadResp.ReadEvent, E>,
    options: TransformOptions,
    checkpointReached?: Filter["checkpointReached"]
  ) {
    super({ ...options, objectMode: true });
    this.#convertGrpcEvent = convertGrpcEvent;
    this.#grpcStream = createGRPCStream();
    this.#checkpointReached = checkpointReached;
    this.initialize();
  }

  private initialize = async () => {
    try {
      (await this.#grpcStream)
        .on("error", (err: ServiceError) => {
          if (isClientCancellationError(err)) return;
          const error = convertToCommandError(err);
          this.emit("error", error);
        })
        .pipe(this);
    } catch (error) {
      this.emit("error", error);
    }
  };

  async _transform(
    resp: ReadResp,
    _encoding: string,
    next: TransformCallback
  ): Promise<void> {
    if (resp.hasConfirmation?.()) {
      this.emit("confirmation");
    }

    if (resp.hasCaughtUp?.()) {
      this.emit("caughtUp");
    }

    if (resp.hasFellBehind?.()) {
      this.emit("fellBehind");
    }

    if (resp.hasCheckpoint?.() && this.#checkpointReached) {
      const checkpoint = resp.getCheckpoint()!;
      const position: Position = {
        commit: BigInt(checkpoint.getCommitPosition()),
        prepare: BigInt(checkpoint.getPreparePosition()),
      };
      await this.#checkpointReached(this, position);
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
