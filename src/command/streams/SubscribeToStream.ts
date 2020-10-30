import { CallOptions } from "@grpc/grpc-js";

import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import { Empty, StreamIdentifier } from "../../../generated/shared_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;

import {
  ESDBConnection,
  ReadRevision,
  ResolvedEvent,
  SubscriptionReport,
  Subscription,
  SubscriptionEvent,
  Listeners,
  SubscriptionListeners,
} from "../../types";
import { Command } from "../Command";
import { OneWaySubscription } from "../../utils/OneWaySubscription";
import { convertGrpcEvent } from "../../utils/convertGrpcEvent";
import { debug } from "../../utils/debug";
import { CLIENT } from "../../symbols";

export class SubscribeToStream extends Command {
  private _stream: string;
  private _revision: ReadRevision;
  private _resolveLinkTos: boolean;
  private _listeners: Listeners<ResolvedEvent, SubscriptionReport> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };

  constructor(stream: string) {
    super();
    this._stream = stream;
    this._revision = "end";
    this._resolveLinkTos = false;
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(revision: bigint): SubscribeToStream {
    this._revision = revision;
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): SubscribeToStream {
    this._revision = "start";
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): SubscribeToStream {
    this._revision = "end";
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): SubscribeToStream {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): SubscribeToStream {
    this._resolveLinkTos = false;
    return this;
  }

  on = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, SubscriptionReport>[Name]
  ): SubscribeToStream => {
    this._listeners[event]?.add(handler as never);
    return this;
  };

  once = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, SubscriptionReport>[Name]
  ): SubscribeToStream => {
    const listener = (...args: unknown[]) => {
      this.off(event, listener);
      // eslint-disable-next-line
      return (handler as any)(...args);
    };
    this.on(event, listener);
    return this;
  };

  off = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, SubscriptionReport>[Name]
  ): SubscribeToStream => {
    this._listeners[event]?.delete(handler as never);
    return this;
  };

  /**
   * Starts the subscription immediately.
   */
  async execute(
    connection: ESDBConnection
  ): Promise<Subscription<ResolvedEvent, SubscriptionReport>> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const streamOptions = new ReadReq.Options.StreamOptions();
    streamOptions.setStreamIdentifier(identifier);

    switch (this._revision) {
      case "start": {
        streamOptions.setStart(new Empty());
        break;
      }

      case "end": {
        streamOptions.setEnd(new Empty());
        break;
      }

      default: {
        streamOptions.setRevision(this._revision.toString(10));
        break;
      }
    }

    options.setStream(streamOptions);
    options.setResolveLinks(this._resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);
    options.setNoFilter(new Empty());

    req.setOptions(options);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    debug.command("SubscribeToAll: %c", this);
    debug.command_grpc("SubscribeToAll: %g", req);

    const client = await connection[CLIENT](StreamsClient, "SubscribeToAll");
    const stream = client.read(req, this.metadata(connection), callOptions);

    return new OneWaySubscription(stream, this._listeners, convertGrpcEvent);
  }
}
