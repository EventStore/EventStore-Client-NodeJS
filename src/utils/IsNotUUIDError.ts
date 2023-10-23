export class IsNotUUIDError extends Error {
  constructor(id: string) {
    super(`Id ${id} is not a valid UUID`);
  }
}
