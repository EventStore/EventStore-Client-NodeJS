export class Defer {
  resolve!: () => void;
  reject!: (reason?: string | Error) => void;
  promise: Promise<void>;

  constructor() {
    this.promise = new Promise<void>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
