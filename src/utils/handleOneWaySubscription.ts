import { ClientReadableStream } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";
import {
  SubscriptionHandler,
  ResolvedEvent,
  SubscriptionReport,
} from "../types";
import { convertGrpcEvent } from "./convertGrpcEvent";

export class SubscriptionReportImpl implements SubscriptionReport {
  private _stream: ClientReadableStream<ReadResp>;

  constructor(stream: ClientReadableStream<ReadResp>) {
    this._stream = stream;
  }
  unsubscribe(): void {
    this._stream.cancel();
  }
}

export function handleOneWaySubscription(
  stream: ClientReadableStream<ReadResp>,
  handler: SubscriptionHandler
): void {
  const report = new SubscriptionReportImpl(stream);

  stream.on("data", (resp: ReadResp) => {
    if (resp.hasConfirmation()) {
      handler.onConfirmation?.();
    }

    if (resp.hasEvent()) {
      const resolved: ResolvedEvent = convertGrpcEvent(resp.getEvent()!);
      handler.onEvent(report, resolved);
    }
  });

  stream.on("end", () => {
    handler.onEnd?.();
  });

  stream.on("error", (error) => {
    handler.onError?.(error);
  });
}
