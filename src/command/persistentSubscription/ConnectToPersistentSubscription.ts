import { CallOptions, ClientDuplexStream } from "@grpc/grpc-js";
import { StreamIdentifier, UUID, Empty } from "../../../generated/shared_pb";
import { ReadReq, ReadResp } from "../../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../../generated/persistent_grpc_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import Action = ReadReq.Nack.Action;

import {
  ESDBConnection,
  PersistentReport,
  PersistentAction,
  PersistentSubscriptionHandler,
} from "../../types";
import { Command } from "../Command";
import { convertGrpcEvent } from "../../utils/convertGrpcEvent";

class PersistentReportImpl implements PersistentReport {
  private _duplexStream: ClientDuplexStream<ReadReq, ReadResp>;
  private _id?: Uint8Array | string;
  private _buffer: number;
  private _stream: string;
  private _group: string;

  constructor(
    buffer: number,
    stream: string,
    group: string,
    duplexStream: ClientDuplexStream<ReadReq, ReadResp>
  ) {
    this._buffer = buffer;
    this._duplexStream = duplexStream;
    this._stream = stream;
    this._group = group;
  }

  setId(value: Uint8Array | string): void {
    this._id = value;
  }

  ack(ids: string[]): void {
    const req = new ReadReq();
    const ack = new ReadReq.Ack();
    const options = new ReadReq.Options();
    const ackedIds: UUID[] = [];
    const identifier = new StreamIdentifier();
    const uuidOption = new UUIDOption();

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    uuidOption.setString(new Empty());
    options.setBufferSize(this._buffer);
    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setUuidOption(uuidOption);

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      ackedIds.push(uuid);
    }

    if (this._id) ack.setId(this._id);
    else throw "Unexpected undefined subscription id";

    req.setAck(ack);
    req.setOptions(options);

    this._duplexStream.write(req);
  }

  nack(action: PersistentAction, reason: string, ids: string[]): void {
    const req = new ReadReq();
    const nack = new ReadReq.Nack();
    const options = new ReadReq.Options();
    const nackedIds: UUID[] = [];
    const identifier = new StreamIdentifier();
    const uuidOption = new UUIDOption();

    switch (action) {
      case "park":
        nack.setAction(Action.PARK);
        break;
      case "retry":
        nack.setAction(Action.RETRY);
        break;
      case "skip":
        nack.setAction(Action.SKIP);
        break;
      case "stop":
        nack.setAction(Action.STOP);
        break;
    }

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));
    uuidOption.setString(new Empty());
    options.setBufferSize(this._buffer);
    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setUuidOption(uuidOption);

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      nackedIds.push(uuid);
    }

    if (this._id) nack.setId(this._id);
    else throw "Unexpected undefined subpscription id";

    nack.setReason(reason);

    req.setNack(nack);
    req.setOptions(options);

    this._duplexStream.write(req);
  }

  unsubscribe(): void {
    this._duplexStream.end();
    this._duplexStream.cancel();
  }
}

export class ConnectToPersistentSubscription extends Command {
  private _stream: string;
  private _group: string;
  private _bufferSize: number;
  private _handler?: PersistentSubscriptionHandler;

  constructor(stream: string, group: string) {
    super();
    this._stream = stream;
    this._group = group;
    this._bufferSize = 10;
  }

  /**
   * The buffer size to use for the persistent subscription.
   * @param value
   */
  bufferSize(value: number): ConnectToPersistentSubscription {
    this._bufferSize = value;
    return this;
  }

  /**
   * Set of callbacks used during the subscription lifecycle.
   * @param handler Set of callbacks used during the subscription lifecycle.
   */
  handler(
    handler: PersistentSubscriptionHandler
  ): ConnectToPersistentSubscription {
    this._handler = handler;
    return this;
  }

  /**
   * Starts the subscription immediately.
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());
    options.setStreamIdentifier(identifier);
    options.setGroupName(this._group);
    options.setBufferSize(this._bufferSize);
    options.setUuidOption(uuidOption);
    req.setOptions(options);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const client = await connection._client(PersistentSubscriptionsClient);
    const stream = client.read(this.metadata, callOptions);
    const report = new PersistentReportImpl(
      this._bufferSize,
      this._stream,
      this._group,
      stream
    );
    stream.write(req);
    stream.on("error", (error) => {
      this._handler?.onError?.(error);
    });

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasSubscriptionConfirmation()) {
        const confirmation = resp.getSubscriptionConfirmation()!;
        report.setId(confirmation.getSubscriptionId());
        this._handler?.onConfirmation?.();
      }

      if (resp.hasEvent()) {
        const resolved = convertGrpcEvent(resp.getEvent()!);
        this._handler?.onEvent(report, resolved);
      }
    });

    stream.on("end", () => {
      this._handler?.onEnd?.();
    });

    stream.on("close", () => {
      this._handler?.onClose?.();
    });
  }
}
