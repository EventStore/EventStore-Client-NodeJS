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
import { ConvertGrpcEvent } from "./convertGrpcEvent";
import { EventsOnlyStream } from "./EventsOnlyStream";

export class OneWaySubscription<E>
  implements Subscription<E, SubscriptionReport> {
  #listeners: Listeners<E, SubscriptionReport> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };
  #stream: ClientReadableStream<ReadResp>;
  #convertGrpcEvent: ConvertGrpcEvent<E>;

  constructor(
    readStream: ClientReadableStream<ReadResp>,
    convertGrpcEvent: ConvertGrpcEvent<E>
  ) {
    this.#convertGrpcEvent = convertGrpcEvent;
    this.#stream = readStream;

    this.#stream.on("data", (resp: ReadResp) => {
      if (resp.hasConfirmation()) {
        this.#listeners.confirmation.forEach((fn) => fn());
      }

      if (resp.hasEvent()) {
        const resolved = this.#convertGrpcEvent(resp.getEvent()!);

        this.#listeners.event.forEach((fn) =>
          fn(resolved, { unsubscribe: this.unsubscribe })
        );
      }
    });

    this.#stream.on("end", () => {
      this.#listeners.end.forEach((fn) => fn());
    });

    this.#stream.on("error", (err: ServiceError) => {
      if (err.code === Status.CANCELLED) return;
      const error = convertToCommandError(err);
      this.#listeners.error.forEach((fn) => fn(error));
    });
  }

  public on = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<E, SubscriptionReport>[Name]
  ): OneWaySubscription<E> => {
    this.#listeners[event]?.add(handler as never);
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
    this.#listeners[event]?.delete(handler as never);
    return this;
  };

  public unsubscribe = (): void => {
    this.#stream.cancel();
  };

  public get isPaused(): boolean {
    return this.#stream.isPaused();
  }

  public pause = (): void => {
    this.#stream.pause();
  };

  public resume = (): void => {
    this.#stream.resume();
  };

  /** Iterate the events asynchronously */
  public [Symbol.asyncIterator] = (): AsyncIterator<E> => {
    return this.#stream
      .pipe(new EventsOnlyStream(this.#convertGrpcEvent))
      [Symbol.asyncIterator]();
  };
}
