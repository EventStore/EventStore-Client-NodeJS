import { CallOptions } from "@grpc/grpc-js";
import { Empty } from "../../../generated/shared_pb";
import { StreamsClient } from "../../../generated/streams_grpc_pb";
import { ReadReq } from "../../../generated/streams_pb";
import UUIDOption = ReadReq.Options.UUIDOption;
import SubscriptionOptions = ReadReq.Options.SubscriptionOptions;
import {
  AllPosition,
  Filter,
  Position,
  StreamEnd,
  StreamPosition,
  StreamStart,
  SubscriptionHandler,
  ESDBConnection,
} from "../../types";
import { Command } from "../Command";
import { handleOneWaySubscription } from "./utils";

export class SubscribeToAll extends Command {
  private _position: AllPosition;
  private _resolveLinkTos: boolean;
  private _filter?: Filter;
  // TODO: handle no handler
  private _handler!: SubscriptionHandler;

  constructor() {
    super();
    this._position = StreamEnd;
    this._resolveLinkTos = false;
  }

  /**
   * Starts the read at the given position in $all.
   * @param position
   */
  fromPosition(position: Position): SubscribeToAll {
    this._position = StreamPosition(position);
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): SubscribeToAll {
    this._position = StreamStart;
    return this;
  }

  /**
   * Starts the read from the end of the stream.
   */
  fromEnd(): SubscribeToAll {
    this._position = StreamEnd;
    return this;
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  resolveLink(): SubscribeToAll {
    this._resolveLinkTos = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  doNotResolveLink(): SubscribeToAll {
    this._resolveLinkTos = false;
    return this;
  }

  /**
   * Filters events or streams based upon a predicate.
   * @param value
   */
  filter(value: Filter): SubscribeToAll {
    this._filter = value;
    return this;
  }

  /**
   * Sets the handler for the subscription
   * @param handler Set of callbacks used during the subscription lifecycle.
   */
  handler(handler: SubscriptionHandler): SubscribeToAll {
    this._handler = handler;
    return this;
  }

  /**
   * Starts the subscription immediately.
   * @param handler Set of callbacks used during the subscription lifecycle.
   */

  async execute(connection: ESDBConnection): Promise<void> {
    const req = new ReadReq();
    const options = new ReadReq.Options();
    const uuidOption = new UUIDOption();
    uuidOption.setString(new Empty());

    const allOptions = new ReadReq.Options.AllOptions();

    switch (this._position.__typename) {
      case "position": {
        const grpcPos = new ReadReq.Options.Position();
        grpcPos.setCommitPosition(this._position.position.commit);
        grpcPos.setPreparePosition(this._position.position.prepare);
        allOptions.setPosition(grpcPos);
        break;
      }

      case "start": {
        allOptions.setStart(new Empty());
        break;
      }

      default: {
        allOptions.setEnd(new Empty());
        break;
      }
    }

    options.setAll(allOptions);
    options.setResolveLinks(this._resolveLinkTos);
    options.setSubscription(new SubscriptionOptions());
    options.setUuidOption(uuidOption);

    if (this._filter) {
      options.setFilter(this._filter.toGrpc());
    } else {
      options.setNoFilter(new Empty());
    }

    req.setOptions(options);

    const callOptions: CallOptions = {
      deadline: Infinity,
    };

    const client = await connection._client(StreamsClient);
    const stream = client.read(req, this.metadata, callOptions);
    handleOneWaySubscription(stream, this._handler);
  }
}
