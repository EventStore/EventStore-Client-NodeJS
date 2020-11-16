import { Subscription } from "../types";

export class SubscriptionIterator<E, R> implements AsyncIterator<E> {
  #maxQueueLength = 10;
  #queue: Array<E> = [];
  #subscription: Subscription<E, R>;
  #running = true;
  #awaiting = false;

  constructor(subscription: Subscription<E, R>) {
    this.#subscription = subscription;
    this.#subscription.on("event", this.#queueEvent);
    this.#subscription.on("end", this.#onEnd);
  }

  public async return(): Promise<IteratorReturnResult<E>> {
    this.#subscription.unsubscribe();
    return { done: true } as IteratorReturnResult<E>;
  }

  public next = async (): Promise<IteratorResult<E, never>> => {
    if (this.#awaiting) {
      throw new Error(
        "Cannot iterate to the next while previous is still active."
      );
    }

    return this.#nextResult();
  };

  #nextResult = async (): Promise<IteratorResult<E, never>> => {
    if (this.#queue.length) {
      const event = this.#queue.pop()!;

      if (this.#queue.length < this.#maxQueueLength) {
        this.#subscription.resume();
      }
      return { value: event };
    }

    if (!this.#running) {
      return { done: true } as IteratorReturnResult<never>;
    }

    this.#awaiting = true;

    await new Promise((resolve) => {
      this.#subscription.once("event", resolve);
    });

    this.#awaiting = false;

    return this.#nextResult();
  };

  #queueEvent = (e: E): void => {
    this.#queue.unshift(e);

    if (this.#queue.length >= this.#maxQueueLength) {
      this.#subscription.pause();
    }
  };

  #onEnd = (): void => {
    this.#running = false;
  };
}
