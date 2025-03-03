import { Cluster } from "./Cluster";
import {
  Credentials,
  EndPoint,
  NodePreference,
} from "@kurrent/kurrentdb-client";

export type ConnectionFeatures = {
  defaultUserCredentials?: Credentials;
  nodePreference?: NodePreference;
  userCertificates?: "valid" | "invalid";
  maxDiscoverAttempts?: number;
  discoveryInterval?: number;
  endpoints?: EndPoint[];
  throwOnAppendFailure?: boolean;
  defaultDeadline?: number;
  connectionName?: string;
};

export const createTestNode = (): Cluster => new Cluster(1);
export const createTestCluster = (count = 3): Cluster => new Cluster(count);
export const createInsecureTestNode = (): Cluster => new Cluster(1, true);
export const createInsecureTestCluster = (count = 3): Cluster =>
  new Cluster(count, true);

export { Cluster };
export * from "./collect";
export * from "./createManyPs";
export * from "./Defer";
export * from "./delay";
export * from "./testEvents";
export * from "./getCurrentConnection";
export * from "./matchServerVersion";
export * from "./optionalDescribe";
export * from "./postEventViaHttpApi";
