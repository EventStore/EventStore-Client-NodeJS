export const delay = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));
