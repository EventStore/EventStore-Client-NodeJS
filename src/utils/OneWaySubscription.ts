/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClientReadableStream, ServiceError } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { ReadResp } from "../../generated/streams_pb";
import {
  Subscription,
  SubscriptionReport,
  SubscriptionListeners,
  SubscriptionEvent,
} from "../types";
import { convertToCommandError } from "./CommandError";

type Listeners<E, R = SubscriptionReport> = {
  [P in keyof SubscriptionListeners<E, R>]: Set<SubscriptionListeners<E, R>[P]>;
};

export class OneWaySubscription<E>
  implements Subscription<E, SubscriptionReport> {
  private _listeners: Listeners<E> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };
  private _stream: ClientReadableStream<ReadResp>;
  private _running = true;
  private _resolve?: (event: E | null) => void;

  constructor(
    stream: ClientReadableStream<ReadResp>,
    listeners: Partial<SubscriptionListeners<E, SubscriptionReport>>,
    convertGrpcEvent: (event: ReadResp.ReadEvent) => E
  ) {
    this._stream = stream;

    for (const [key, entry] of Object.entries(listeners)) {
      this.on(key as keyof typeof listeners, entry);
    }

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

  public on(event: SubscriptionEvent, handler: any): void {
    this._listeners[event]?.add(handler);
  }

  public once = (event: SubscriptionEvent, handler: any): void => {
    const listener = (...args: unknown[]) => {
      this.off(event, listener);
      return handler(...args);
    };
    this.on(event, listener);
  };

  public off = (event: SubscriptionEvent, handler: any): void => {
    this._listeners[event]?.delete(handler);
  };

  public unsubscribe = (): void => {
    this._stream.cancel();
    this._running = false;

    if (this._resolve) this._resolve(null);
  };

  public async return(): Promise<IteratorReturnResult<E>> {
    this.unsubscribe();
    return { done: true } as IteratorReturnResult<E>;
  }

  public next = (): Promise<IteratorResult<E, never>> => {
    return new Promise<IteratorResult<E, never>>((resolve, reject) => {
      if (this._resolve) {
        return reject(
          new Error(
            "Cannot iterate to the next while previous is still active."
          )
        );
      }
      if (!this._running) {
        return resolve({ done: true } as IteratorReturnResult<never>);
      }

      this._resolve = (e) => {
        resolve({ value: e } as IteratorYieldResult<E>);
        delete this._resolve;
      };

      this.once("event", this._resolve);
    });
  };

  /** Iterate the events asynchronously */
  public [Symbol.asyncIterator] = (): OneWaySubscription<E> => {
    return this;
  };
}
