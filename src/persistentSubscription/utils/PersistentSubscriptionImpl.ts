import { Transform, TransformCallback, TransformOptions } from "stream";

import { ClientDuplexStream, ServiceError, status } from "@grpc/grpc-js";

import { ReadReq, ReadResp } from "../../../generated/persistent_pb";

import {
  convertToCommandError,
  ConvertGrpcEvent,
  createUUID,
  backpressuredWrite,
} from "../../utils";
import {
  PersistentAction,
  PersistentSubscriptionBase,
  ResolvedEvent,
} from "../../types";

type CreateGRPCStream = () => Promise<ClientDuplexStream<ReadReq, ReadResp>>;

export class PersistentSubscriptionImpl<E>
  extends Transform
  implements PersistentSubscriptionBase<E>
{
  #grpcStream: Promise<ClientDuplexStream<ReadReq, ReadResp>>;
  #convertGrpcEvent: ConvertGrpcEvent<E>;

  constructor(
    createGRPCStream: CreateGRPCStream,
    convertGrpcEvent: ConvertGrpcEvent<E>,
    options: TransformOptions
  ) {
    super({ ...options, objectMode: true });
    this.#grpcStream = createGRPCStream();
    this.#convertGrpcEvent = convertGrpcEvent;
    this.initialize();
  }

  private initialize = async () => {
    try {
      (await this.#grpcStream)
        .on("error", (err: ServiceError) => {
          if (err.code === status.CANCELLED) return;
          const error = convertToCommandError(err);
          this.emit("error", error);
        })
        .pipe(this);
    } catch (error) {
      this.emit("error", error);
    }
  };

  _transform(resp: ReadResp, _encoding: string, next: TransformCallback): void {
    if (resp.hasSubscriptionConfirmation()) {
      this.emit("confirmation");
    }

    if (resp.hasEvent()) {
      const resolved = this.#convertGrpcEvent(resp.getEvent()!);
      next(null, resolved);
      return;
    }

    next();
  }

  public async ack(...events: Array<string | ResolvedEvent>): Promise<void> {
    try {
      const req = new ReadReq();
      const ack = new ReadReq.Ack();

      for (const event of events) {
        const id =
          typeof event === "string" ? event : event.link?.id ?? event.event?.id;

        // A resolved event will always have either link or event (or both), so this should to be unreachable
        if (!id) throw new Error("Attempted to ack an event with no id");

        const uuid = createUUID(id);
        ack.addIds(uuid);
      }

      req.setAck(ack);

      const stream = await this.#grpcStream;
      await backpressuredWrite(stream, req);
    } catch (error) {
      throw convertToCommandError(error);
    }
  }

  public async nack(
    action: PersistentAction,
    reason: string,
    ...events: Array<string | ResolvedEvent>
  ): Promise<void> {
    try {
      const req = new ReadReq();
      const nack = new ReadReq.Nack();

      switch (action) {
        case "park":
          nack.setAction(ReadReq.Nack.Action.PARK);
          break;
        case "retry":
          nack.setAction(ReadReq.Nack.Action.RETRY);
          break;
        case "skip":
          nack.setAction(ReadReq.Nack.Action.SKIP);
          break;
        case "stop":
          nack.setAction(ReadReq.Nack.Action.STOP);
          break;
      }

      for (const event of events) {
        const id =
          typeof event === "string" ? event : event.link?.id ?? event.event?.id;

        // A resolved event will always have either link or event (or both), so this should to be unreachable
        if (!id) throw new Error("Attempted to ack an event with no id");

        const uuid = createUUID(id);
        nack.addIds(uuid);
      }

      nack.setReason(reason);

      req.setNack(nack);

      const stream = await this.#grpcStream;
      await backpressuredWrite(stream, req);
    } catch (error) {
      throw convertToCommandError(error);
    }
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
