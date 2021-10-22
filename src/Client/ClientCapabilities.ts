import { Empty } from "../../generated/shared_pb";
import { ClientCapabilitiesClient } from "../../generated/clientcapabilities_grpc_pb";

import type { MethodDefinition, ServiceError } from "@grpc/grpc-js";

import { debug } from "../utils";
import { SupportedMethods } from "../../generated/clientcapabilities_pb";
import { GRPCClientConstructor } from "../types";

type ExecuteClientCapabilities = [
  GRPCClientConstructor<ClientCapabilitiesClient>,
  string,
  (c: ClientCapabilitiesClient) => Promise<ClientCapabilities>
];

const UNKNOWN = "unknown";

interface ServerVersion {
  string: string;
  year: number;
  month: number;
  patch: number;
}

const parseServerVersion = (
  version: string
): ServerVersion | typeof UNKNOWN => {
  const match = version.match(
    /^(?<year>[0-9]+)[.](?<month>[0-9]+)[.](?<patch>[0-9]+)/
  );

  if (!match) return UNKNOWN;

  return {
    string: version,
    year: parseInt(match.groups!.year, 10),
    month: parseInt(match.groups!.month, 10),
    patch: parseInt(match.groups!.patch, 10),
  };
};

const stringToOperator = (op?: string): ((a: number, b: number) => boolean) => {
  switch (op) {
    case ">":
      return (a, b) => a > b;
    case "<":
      return (a, b) => a < b;
    case ">=":
      return (a, b) => a >= b;
    case "<=":
      return (a, b) => a <= b;
    default:
      return (a, b) => a === b;
  }
};

export class ClientCapabilities {
  public serverVersion: ServerVersion | typeof UNKNOWN = UNKNOWN;

  #supported: Set<string> = new Set();

  static readonly createClientCapabilities: ExecuteClientCapabilities = [
    ClientCapabilitiesClient,
    "getSupportedMethods",
    (client: ClientCapabilitiesClient): Promise<ClientCapabilities> =>
      new Promise<ClientCapabilities>((resolve) => {
        debug.connection("Fetching server capabilities");
        client.getSupportedMethods(new Empty(), (error, supportedMethods) => {
          resolve(new ClientCapabilities(error, supportedMethods));
        });
      }),
  ];

  constructor(error: ServiceError | null, supportedMethods: SupportedMethods) {
    if (error) {
      debug.connection("Connected to unknown server version");
      return;
    }

    this.serverVersion = parseServerVersion(
      supportedMethods.getEventstoreserverversion()
    );

    debug.connection(
      "Connected to server version %s",
      typeof this.serverVersion === "string"
        ? this.serverVersion
        : this.serverVersion.string
    );

    for (const method of supportedMethods.getMethodsList()) {
      const path = `/${method.getServicename()}/${method.getMethodname()}`;
      this.#supported.add(path);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public supports = ({ path }: MethodDefinition<any, any>): boolean => {
    const isSupported = this.#supported.has(path);
    if (isSupported) {
      debug.connection("%s is Supported", path);
    } else {
      debug.connection("%s is not Supported", path);
    }
    return isSupported;
  };

  public versionMatches = (matchString: string): boolean => {
    const match = matchString.match(
      /^(?<operator>>|<|>=|<=)?(?<year>[0-9]+)([.](?<month>[0-9]+))?([.](?<patch>[0-9]+))?/
    );

    if (!match) throw `Malformed version match string ${matchString}`;

    const groups = match.groups as {
      operator?: string;
      year: string;
      month?: string;
      patch?: string;
    };

    if (this.serverVersion === UNKNOWN) {
      return !!groups.operator?.startsWith("<");
    }

    const operator = stringToOperator(groups.operator);

    if (!operator(parseInt(groups.year, 10), this.serverVersion.year)) {
      return false;
    }

    if (
      groups.month != null &&
      !operator(parseInt(groups.month, 10), this.serverVersion.month)
    ) {
      return false;
    }

    if (
      groups.patch != null &&
      !operator(parseInt(groups.patch, 10), this.serverVersion.patch)
    ) {
      return false;
    }

    return true;
  };
}
