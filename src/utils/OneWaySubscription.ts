/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { ReadResp } from "../../generated/streams_pb";
import {
  Subscription,
  SubscriptionReport,
  SubscriptionEvent,
  Listeners,
  SubscriptionListeners,
} from "../types";
import { convertToCommandError } from "./CommandError";
import { SubscriptionIterator } from "./SubscriptionIterator";

export class OneWaySubscription<E>
  implements Subscription<E, SubscriptionReport> {
  private _listeners: Listeners<E, SubscriptionReport> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };
  private _stream: ClientReadableStream<ReadResp>;

  constructor(
    stream: ClientReadableStream<ReadResp>,
    listeners: Listeners<E, SubscriptionReport>,
    convertGrpcEvent: (event: ReadResp.ReadEvent) => E
  ) {
    this._stream = stream;
    this._listeners = listeners;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasConfirmation()) {
        this._listeners.confirmation.forEach((fn) => fn());
      }

      if (resp.hasEvent()) {
        const resolved = convertGrpcEvent(resp.getEvent()!);

        this._listeners.event.forEach((fn) =>
          fn(resolved, { unsubscribe: this.unsubscribe })
        );
      }
    });

    stream.on("end", () => {
      this._listeners.end.forEach((fn) => fn());
    });

    stream.on("error", (err: ServiceError) => {
      if (err.code === Status.CANCELLED) return;
      const error = convertToCommandError(err);
      this._listeners.error.forEach((fn) => fn(error));
    });
  }

  public on = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<E, SubscriptionReport>[Name]
  ): OneWaySubscription<E> => {
    this._listeners[event]?.add(handler as never);
    return this;
  };

  public once = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<E, SubscriptionReport>[Name]
  ): OneWaySubscription<E> => {
    const listener = (...args: unknown[]) => {
      this.off(event, listener);
      // eslint-disable-next-line
      return (handler as any)(...args);
    };
    this.on(event, listener);
    return this;
  };

  public off = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<E, SubscriptionReport>[Name]
  ): OneWaySubscription<E> => {
    this._listeners[event]?.delete(handler as never);
    return this;
  };

  public unsubscribe = (): void => {
    this._stream.cancel();
  };

  public get isPaused(): boolean {
    return this._stream.isPaused();
  }

  public pause = (): void => {
    this._stream.pause();
  };

  public resume = (): void => {
    this._stream.resume();
  };

  /** Iterate the events asynchronously */
  public [Symbol.asyncIterator] = (): AsyncIterator<E> => {
    return new SubscriptionIterator(this);
  };
}
