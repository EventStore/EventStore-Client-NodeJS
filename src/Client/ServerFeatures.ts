import type { MethodDefinition, ServiceError } from "@grpc/grpc-js";

import { Empty } from "../../generated/shared_pb";
import { ServerFeaturesClient } from "../../generated/serverfeatures_grpc_pb";
import type { SupportedMethods } from "../../generated/serverfeatures_pb";

import { debug } from "../utils";
import type { GRPCClientConstructor } from "../types";

type ExecuteClientCapabilities = [
  GRPCClientConstructor<ServerFeaturesClient>,
  string,
  (c: ServerFeaturesClient) => Promise<ServerFeatures>
];

const UNKNOWN = "unknown";

export class ServerFeatures {
  public serverVersion: string = UNKNOWN;

  #supported = new Map<string, Set<string>>();

  static readonly createServerFeatures: ExecuteClientCapabilities = [
    ServerFeaturesClient,
    "getSupportedMethods",
    (client: ServerFeaturesClient) =>
      new Promise<ServerFeatures>((resolve) => {
        debug.connection("Fetching server features");
        client.getSupportedMethods(new Empty(), (error, supportedMethods) => {
          resolve(new ServerFeatures(error, supportedMethods));
        });
      }),
  ];

  constructor(error: ServiceError | null, supportedMethods: SupportedMethods) {
    if (error) {
      debug.connection("Connected to unknown server version");
      return;
    }

    this.serverVersion = supportedMethods.getEventStoreServerVersion();

    debug.connection("Connected to server version %s", this.serverVersion);

    for (const method of supportedMethods.getMethodsList()) {
      const path =
        `/${method.getServiceName()}/${method.getMethodName()}`.toLowerCase();
      const features = method.getFeaturesList();
      this.#supported.set(path, new Set(features));
    }
  }

  public supports = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    method: MethodDefinition<any, any>,
    feature?: string
  ): boolean => {
    const path = method.path.toLowerCase();
    const isSupported = feature
      ? !!this.#supported.get(path)?.has(feature)
      : this.#supported.has(path);

    if (isSupported) {
      debug.connection("%s %s is Supported", path, feature ?? "");
    } else {
      debug.connection("%s %s is not Supported", path, feature ?? "");
    }

    return isSupported;
  };
}
