import { StreamIdentifier, Empty } from "../../../generated/shared_pb";
import { ReadReq } from "../../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../../generated/persistent_grpc_pb";
import UUIDOption = ReadReq.Options.UUIDOption;

import {
  ESDBConnection,
  Listeners,
  ResolvedEvent,
  SubscriptionEvent,
  SubscriptionListeners,
  PersistentReport,
} from "../../types";
import { Command } from "../Command";
import { TwoWaySubscription } from "../../utils/TwoWaySubscription";
import { debug } from "../../utils/debug";

export class ConnectToPersistentSubscription extends Command {
  private _streamName: string;
  private _groupName: string;
  private _bufferSize: number;
  private _listeners: Listeners<ResolvedEvent, PersistentReport> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };

  constructor(streamName: string, groupName: string) {
    super();
    this._streamName = streamName;
    this._groupName = groupName;
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

  on = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): ConnectToPersistentSubscription => {
    this._listeners[event]?.add(handler as never);
    return this;
  };

  once = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): ConnectToPersistentSubscription => {
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
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): ConnectToPersistentSubscription => {
    this._listeners[event]?.delete(handler as never);
    return this;
  };

  /**
   * Starts the subscription immediately.
   */
  async execute(connection: ESDBConnection): Promise<TwoWaySubscription> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const identifier = new StreamIdentifier();
    identifier.setStreamname(Buffer.from(this._streamName).toString("base64"));

    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());
    options.setStreamIdentifier(identifier);
    options.setGroupName(this._groupName);
    options.setBufferSize(this._bufferSize);
    options.setUuidOption(uuidOption);
    req.setOptions(options);

    debug.command("ConnectToPersistentSubscription: %c", this);
    debug.command_grpc("ConnectToPersistentSubscription: %g", req);

    const client = await connection._client(
      PersistentSubscriptionsClient,
      "ConnectToPersistentSubscription"
    );
    const stream = client.read(this.metadata, {
      deadline: Infinity,
    });
    stream.write(req);

    return new TwoWaySubscription(stream, this._listeners);
  }
}
