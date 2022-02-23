import type { BaseOptions } from "../types";

export type InternalOptions<T extends BaseOptions> = Required<
  Omit<T, keyof BaseOptions>
> &
  BaseOptions;
