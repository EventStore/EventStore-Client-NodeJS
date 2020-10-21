import { StreamIdentifier } from "../../../generated/shared_pb";
import { UpdateReq } from "../../../generated/persistent_pb";
import { PersistentSubscriptionsClient } from "../../../generated/persistent_grpc_pb";

import { ConsumerStrategy, ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";

export class UpdatePersistentSubscription extends Command {
  private _stream: string;
  private _group: string;
  private _resolveLink: boolean;
  private _revision: bigint;
  private _extraStats: boolean;
  private _messageTimeout: number;
  private _maxRetryCount: number;
  private _checkpointAfter: number;
  private _minCheckpointCount: number;
  private _maxCheckpointCount: number;
  private _maxSubscriberCount: number;
  private _liveBufferSize: number;
  private _readBatchSize: number;
  private _historyBufferSize: number;
  private _strategy: ConsumerStrategy;

  constructor(stream: string, group: string) {
    super();
    this._stream = stream;
    this._group = group;
    this._resolveLink = false;
    this._extraStats = false;
    this._revision = BigInt(0);
    this._messageTimeout = 30_000;
    this._maxRetryCount = 10;
    this._checkpointAfter = 2_000;
    this._minCheckpointCount = 10;
    this._maxCheckpointCount = 1_000;
    this._maxSubscriberCount = 0;
    this._liveBufferSize = 500;
    this._readBatchSize = 20;
    this._historyBufferSize = 500;
    this._strategy = "round_robin";
  }

  /**
   * The best way to explain link resolution is when using system projections. When reading the stream `$streams` (which
   * contains all streams), each event is actually a link pointing to the first event of a stream. By enabling link
   * resolution feature, the server will also return the event targeted by the link.
   */
  enableLinkResolution(): UpdatePersistentSubscription {
    this._resolveLink = true;
    return this;
  }

  /**
   * Disables link resolution. See {@link resolveLink}. Default behavior.
   */
  disableLinkResolution(): UpdatePersistentSubscription {
    this._resolveLink = false;
    return this;
  }

  /**
   * Enables in depth latency statistics should be tracked on this subscription.
   */
  enableExtraStats(): UpdatePersistentSubscription {
    this._extraStats = true;
    return this;
  }

  /**
   * See {@link enableExtraStats}
   */
  disableExtraStats(): UpdatePersistentSubscription {
    this._extraStats = false;
    return this;
  }

  /**
   * Starts the read from the beginning of the stream. Default behavior.
   */
  fromStart(): UpdatePersistentSubscription {
    return this.fromRevision(BigInt(0));
  }

  /**
   * Starts the read at the given event revision.
   * @param revision
   */
  fromRevision(value: bigint): UpdatePersistentSubscription {
    this._revision = BigInt(value);
    return this;
  }

  /**
   * The amount of time after which a message should be considered to be timeout and retried.
   * @param value timeout in milliseconds.
   */
  messageTimeout(value: number): UpdatePersistentSubscription {
    this._messageTimeout = value;
    return this;
  }

  /**
   * The maximum number of retries (due to timeout) before a message get considered to be parked.
   * @param value
   */
  maxRetryCount(value: number): UpdatePersistentSubscription {
    this._maxRetryCount = value;
    return this;
  }

  /**
   * The amount of time to try checkpoint after.
   * @param value amount of time in milliseconds.
   */
  checkpointAfter(value: number): UpdatePersistentSubscription {
    this._checkpointAfter = value;
    return this;
  }

  /**
   * The minimum number of messages to checkpoint.
   * @param value
   */
  minCheckpointCount(value: number): UpdatePersistentSubscription {
    this._minCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of messages to checkpoint. If this number is reached , a checkpoint will be forced.
   * @param value
   */
  maxCheckpointCount(value: number): UpdatePersistentSubscription {
    this._maxCheckpointCount = value;
    return this;
  }

  /**
   * The maximum number of subscribers allowed.
   * @param value
   */
  maxSubscriberCount(value: number): UpdatePersistentSubscription {
    this._maxSubscriberCount = value;
    return this;
  }

  /**
   * Set no restriction of the number of subscriber that subscription can support.
   * See {@link maxSubscriberCount}
   */
  noSubscriberCountLimitation(): UpdatePersistentSubscription {
    return this.maxCheckpointCount(0);
  }

  /**
   * The size of the buffer listening to live messages as they happen.
   * @param value
   */
  liveBufferSize(value: number): UpdatePersistentSubscription {
    this._liveBufferSize = value;
    return this;
  }

  /**
   * The number of events read at a time when paging in history.
   * @param value
   */
  readBatchSize(value: number): UpdatePersistentSubscription {
    this._readBatchSize = value;
    return this;
  }

  /**
   * The number of events to cache when paging through history.
   * @param value
   */
  historyBufferSize(value: number): UpdatePersistentSubscription {
    this._historyBufferSize = value;
    return this;
  }

  /**
   * The strategy to use for distributing events to client consumers.
   * @param strategy
   */
  consumerStrategy(strategy: ConsumerStrategy): UpdatePersistentSubscription {
    this._strategy = strategy;
    return this;
  }

  /**
   * Updates a persistent subscription asynchronously.
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new UpdateReq();
    const options = new UpdateReq.Options();
    const identifier = new StreamIdentifier();
    const settings = new UpdateReq.Settings();

    settings.setResolveLinks(this._resolveLink);
    settings.setRevision(this._revision.toString(10));
    settings.setExtraStatistics(this._extraStats);
    settings.setMessageTimeoutMs(this._messageTimeout);
    settings.setCheckpointAfterMs(this._checkpointAfter);
    settings.setMaxRetryCount(this._maxRetryCount);
    settings.setMinCheckpointCount(this._minCheckpointCount);
    settings.setMaxCheckpointCount(this._maxCheckpointCount);
    settings.setMaxSubscriberCount(this._maxSubscriberCount);
    settings.setLiveBufferSize(this._liveBufferSize);
    settings.setReadBatchSize(this._readBatchSize);
    settings.setHistoryBufferSize(this._historyBufferSize);

    switch (this._strategy) {
      case "dispatch_to_single":
        settings.setNamedConsumerStrategy(
          UpdateReq.ConsumerStrategy.DISPATCHTOSINGLE
        );
        break;
      case "pinned":
        settings.setNamedConsumerStrategy(UpdateReq.ConsumerStrategy.PINNED);
        break;
      case "round_robin":
        settings.setNamedConsumerStrategy(
          UpdateReq.ConsumerStrategy.ROUNDROBIN
        );
        break;
    }

    identifier.setStreamname(Buffer.from(this._stream).toString("base64"));

    options.setGroupName(this._group);
    options.setStreamIdentifier(identifier);
    options.setSettings(settings);

    req.setOptions(options);

    debug.command("UpdatePersistentSubscription: %c", this);
    debug.command_grpc("UpdatePersistentSubscription: %g", req);

    const client = await connection._client(
      PersistentSubscriptionsClient,
      "UpdatePersistentSubscription"
    );

    return new Promise<void>((resolve, reject) => {
      client.update(req, this.metadata, (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
