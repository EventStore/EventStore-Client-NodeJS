import { Transform, TransformCallback, TransformOptions } from "stream";
import { GRPCReadResp, ConvertGrpcEvent } from "./convertGrpcEvent";

export type EventsOnlyStreamOptions = Omit<
  TransformOptions,
  "readableObjectMode" | "writableObjectMode" | "objectMode"
>;

export class EventsOnlyStream<E> extends Transform {
  private convertGrpcEvent: ConvertGrpcEvent<E>;

  constructor(
    convertGrpcEvent: ConvertGrpcEvent<E>,
    options: EventsOnlyStreamOptions = {}
  ) {
    super({
      ...options,
      readableObjectMode: true,
      writableObjectMode: true,
    });
    this.convertGrpcEvent = convertGrpcEvent;
  }

  _transform(
    resp: GRPCReadResp,
    _encoding: string,
    next: TransformCallback
  ): void {
    if (resp.hasEvent()) {
      const resolved = this.convertGrpcEvent(resp.getEvent()!);
      return next(null, resolved);
    }

    next();
  }
}
