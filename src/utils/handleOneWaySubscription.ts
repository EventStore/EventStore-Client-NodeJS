import { ClientReadableStream } from "@grpc/grpc-js";
import { ReadResp } from "../../generated/streams_pb";
import {
  SubscriptionHandler,
  RecordedEvent,
  ResolvedEvent,
  SubscriptionReport,
} from "../types";
import { convertGrpcRecord } from "./convertGrpcRecord";

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
      const grpcEvent = resp.getEvent()!;
      let event: RecordedEvent | undefined;
      let link: RecordedEvent | undefined;

      if (grpcEvent.hasEvent()) {
        event = convertGrpcRecord(grpcEvent.getEvent()!);
      }

      if (grpcEvent.hasLink()) {
        link = convertGrpcRecord(grpcEvent.getLink()!);
      }

      const resolved: ResolvedEvent = {
        event,
        link,
        commit_position: grpcEvent.getCommitPosition(),
      };

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
