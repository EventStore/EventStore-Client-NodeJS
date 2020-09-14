import { Cluster } from "./Cluster";

export const createTestNode = (): Cluster => new Cluster(1);
export const createTestCluster = (count = 3): Cluster => new Cluster(count);
export const createInsecureTestNode = (): Cluster => new Cluster(1, true);
export const createInsecureTestCluster = (count = 3): Cluster =>
  new Cluster(count, true);

export * from "./Defer";
export * from "./delay";
