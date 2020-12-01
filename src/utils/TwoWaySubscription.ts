import { ServiceError, ClientDuplexStream } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";

import { UUID } from "../../generated/shared_pb";
import { ReadReq, ReadResp } from "../../generated/persistent_pb";
import Action = ReadReq.Nack.Action;

import {
  Subscription,
  SubscriptionEvent,
  Listeners,
  SubscriptionListeners,
  ResolvedEvent,
  PersistentAction,
  PersistentReport,
} from "../types";
import { convertGrpcEvent } from "./convertGrpcEvent";
import { convertToCommandError } from "./CommandError";
import { EventsOnlyStream } from "./EventsOnlyStream";

export class TwoWaySubscription
  implements Subscription<ResolvedEvent, PersistentReport> {
  #listeners: Listeners<ResolvedEvent, PersistentReport> = {
    event: new Set(),
    end: new Set(),
    confirmation: new Set(),
    error: new Set(),
    close: new Set(),
  };
  #stream: ClientDuplexStream<ReadReq, ReadResp>;

  constructor(stream: ClientDuplexStream<ReadReq, ReadResp>) {
    this.#stream = stream;

    stream.on("data", (resp: ReadResp) => {
      if (resp.hasSubscriptionConfirmation()) {
        this.#listeners.confirmation.forEach((fn) => fn());
      }

      if (resp.hasEvent()) {
        const resolved = convertGrpcEvent(resp.getEvent()!);

        this.#listeners.event.forEach((fn) =>
          fn(resolved, {
            ack: this.ack,
            nack: this.nack,
            unsubscribe: this.unsubscribe,
          })
        );
      }
    });

    stream.on("end", () => {
      this.#listeners.end.forEach((fn) => fn());
    });

    stream.on("error", (err: ServiceError) => {
      if (err.code === Status.CANCELLED) return;
      const error = convertToCommandError(err);
      this.#listeners.error.forEach((fn) => fn(error));
    });
  }

  public ack = (...ids: string[]): void => {
    const req = new ReadReq();
    const ack = new ReadReq.Ack();

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      ack.addIds(uuid);
    }

    req.setAck(ack);
    this.#stream.write(req);
  };

  public nack = (
    action: PersistentAction,
    reason: string,
    ...ids: string[]
  ): void => {
    const req = new ReadReq();
    const nack = new ReadReq.Nack();

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

    for (const id of ids) {
      const uuid = new UUID();
      uuid.setString(id);
      nack.addIds(uuid);
    }

    nack.setReason(reason);

    req.setNack(nack);

    this.#stream.write(req);
  };

  public on = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): TwoWaySubscription => {
    this.#listeners[event]?.add(handler as never);
    return this;
  };

  public once = <Name extends SubscriptionEvent>(
    event: Name,
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): TwoWaySubscription => {
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
    handler: SubscriptionListeners<ResolvedEvent, PersistentReport>[Name]
  ): TwoWaySubscription => {
    this.#listeners[event]?.delete(handler as never);
    return this;
  };

  public unsubscribe = (): void => {
    this.#stream.end();
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
  public [Symbol.asyncIterator] = (): AsyncIterator<ResolvedEvent> => {
    return this.#stream
      .pipe(new EventsOnlyStream(convertGrpcEvent))
      [Symbol.asyncIterator]();
  };
}
