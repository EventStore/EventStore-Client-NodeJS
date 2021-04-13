import { existsSync, readFileSync } from "fs";
import { isAbsolute, resolve } from "path";

import {
  CallCredentials as grpcCallCredentials,
  CallOptions,
  Channel,
  ChannelCredentials,
  Client as GRPCClient,
  ClientOptions as GRPCClientOptions,
  credentials as grpcCredentials,
  Metadata,
} from "@grpc/grpc-js";

import type {
  NodePreference,
  GRPCClientConstructor,
  EndPoint,
  Credentials,
  BaseOptions,
} from "../types";
import { debug } from "../utils";
import { discoverEndpoint } from "./discovery";
import { parseConnectionString } from "./parseConnectionString";

interface ClientOptions {
  /**
   * The amount of time (in milliseconds) to wait after which a keepalive ping is sent on the transport.
   * Use -1 to disable.
   * @default 10_000
   */
  keepAliveInterval?: number;
  /**
   * The amount of time (in milliseconds) the sender of the keepalive ping waits for an acknowledgement.
   * If it does not receive an acknowledgment within this time, it will close the connection.
   * @default 10_000
   */
  keepAliveTimeout?: number;
  /**
   * Whether or not to immediately throw an exception when an append fails.
   * @default true
   */
  throwOnAppendFailure?: boolean;
}

interface DiscoveryOptions {
  /**
   * How many times to attempt connection before throwing.
   */
  maxDiscoverAttempts?: number;
  /**
   * How long to wait before retrying (in milliseconds).
   */
  discoveryInterval?: number;
  /**
   * How long to wait for the request to time out (in seconds).
   */
  gossipTimeout?: number;
  /**
   * Preferred node type.
   */
  nodePreference?: NodePreference;
}

export interface DNSClusterOptions extends DiscoveryOptions, ClientOptions {
  discover: EndPoint;
}

export interface GossipClusterOptions extends DiscoveryOptions, ClientOptions {
  endpoints: EndPoint[];
}

export interface SingleNodeOptions extends ClientOptions {
  endpoint: EndPoint | string;
}

export type ConnectionTypeOptions =
  | DNSClusterOptions
  | GossipClusterOptions
  | SingleNodeOptions;

interface ChannelCredentialOptions {
  insecure?: boolean;
  rootCertificate?: Buffer;
  privateKey?: Buffer;
  certChain?: Buffer;
  verifyOptions?: Parameters<typeof ChannelCredentials.createSsl>[3];
}

export class Client {
  #throwOnAppendFailure: boolean;
  #connectionSettings: ConnectionTypeOptions;
  #channelCredentials: ChannelCredentials;
  #insecure: boolean;
  #keepAliveInterval: number;
  #keepAliveTimeout: number;

  #defaultCredentials?: Credentials;

  #channel?: Promise<Channel>;
  #grpcClients: Map<
    GRPCClientConstructor<GRPCClient>,
    Promise<GRPCClient>
  > = new Map();

  // eslint-disable-next-line jsdoc/require-param
  /**
   * Returns a connection from a connection string.
   * @param connectionString The connection string for your database.
   */
  static connectionString(
    connectionString: TemplateStringsArray | string,
    ...parts: Array<string | number | boolean>
  ): Client {
    const string: string = Array.isArray(connectionString)
      ? connectionString.reduce<string>(
          (acc, chunk, i) => `${acc}${chunk}${parts[i] ?? ""}`,
          ""
        )
      : (connectionString as string);

    debug.connection(`Using connection string: ${string}`);

    const options = parseConnectionString(string);

    const channelCredentials: ChannelCredentialOptions = {
      insecure: options.tls === false,
    };

    if (options.tlsCAFile) {
      if (channelCredentials.insecure) {
        debug.connection(
          "tslCAFile passed to insecure connection. Will be ignored."
        );
      } else {
        const resolvedPath = isAbsolute(options.tlsCAFile)
          ? options.tlsCAFile
          : resolve(process.cwd(), options.tlsCAFile);

        debug.connection(`Resolved tslCAFile option as ${resolvedPath}`);

        if (!existsSync(resolvedPath)) {
          throw new Error(
            "Failed to load certificate file. File was not found."
          );
        }

        channelCredentials.rootCertificate = readFileSync(resolvedPath);
      }
    }

    if (options.dnsDiscover) {
      const [discover] = options.hosts;

      if (options.hosts.length > 1) {
        debug.connection(
          `More than one address provided for discovery. Using first: ${discover.address}:${discover.port}.`
        );
      }

      return new Client(
        {
          discover,
          nodePreference: options.nodePreference,
          discoveryInterval: options.discoveryInterval,
          gossipTimeout: options.gossipTimeout,
          maxDiscoverAttempts: options.maxDiscoverAttempts,
          throwOnAppendFailure: options.throwOnAppendFailure,
          keepAliveInterval: options.keepAliveInterval,
          keepAliveTimeout: options.keepAliveTimeout,
        },
        channelCredentials,
        options.defaultCredentials
      );
    }

    if (options.hosts.length > 1) {
      return new Client(
        {
          endpoints: options.hosts,
          nodePreference: options.nodePreference,
          discoveryInterval: options.discoveryInterval,
          gossipTimeout: options.gossipTimeout,
          maxDiscoverAttempts: options.maxDiscoverAttempts,
          throwOnAppendFailure: options.throwOnAppendFailure,
          keepAliveInterval: options.keepAliveInterval,
          keepAliveTimeout: options.keepAliveTimeout,
        },
        channelCredentials,
        options.defaultCredentials
      );
    }

    return new Client(
      {
        endpoint: options.hosts[0],
        throwOnAppendFailure: options.throwOnAppendFailure,
        keepAliveInterval: options.keepAliveInterval,
        keepAliveTimeout: options.keepAliveTimeout,
      },
      channelCredentials,
      options.defaultCredentials
    );
  }

  constructor(
    connectionSettings: DNSClusterOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    connectionSettings: GossipClusterOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    connectionSettings: SingleNodeOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    {
      throwOnAppendFailure = true,
      keepAliveInterval = 10_000,
      keepAliveTimeout = 10_000,
      ...connectionSettings
    }: ConnectionTypeOptions,
    channelCredentials: ChannelCredentialOptions = { insecure: false },
    defaultUserCredentials?: Credentials
  ) {
    if (keepAliveInterval < -1) {
      throw new Error(
        `Invalid keepAliveInterval "${keepAliveInterval}". Please provide a positive integer, or -1 to disable.`
      );
    }

    if (keepAliveTimeout < -1) {
      throw new Error(
        `Invalid keepAliveTimeout "${keepAliveTimeout}". Please provide a positive integer, or -1 to disable.`
      );
    }

    if (keepAliveInterval > -1 && keepAliveInterval < 10_000) {
      console.warn(
        `Specified KeepAliveInterval of ${keepAliveInterval} is less than recommended 10_000 ms.`
      );
    }

    this.#throwOnAppendFailure = throwOnAppendFailure;
    this.#keepAliveInterval = keepAliveInterval;
    this.#keepAliveTimeout = keepAliveTimeout;
    this.#connectionSettings = connectionSettings;
    this.#insecure = !!channelCredentials.insecure;
    this.#defaultCredentials = defaultUserCredentials;

    if (this.#insecure) {
      debug.connection("Using insecure channel");
      this.#channelCredentials = grpcCredentials.createInsecure();
    } else {
      debug.connection(
        "Using secure channel with credentials %O",
        channelCredentials
      );
      this.#channelCredentials = grpcCredentials.createSsl(
        channelCredentials.rootCertificate,
        channelCredentials.privateKey,
        channelCredentials.certChain,
        channelCredentials.verifyOptions
      );
    }
  }

  // Internal access to grpc client.
  protected getGRPCClient = async <T extends GRPCClient>(
    Client: GRPCClientConstructor<T>,
    debugName: string
  ): Promise<T> => {
    if (this.#grpcClients.has(Client)) {
      debug.connection("Using existing grpc client for %s", debugName);
    } else {
      debug.connection("Createing client for %s", debugName);
      this.#grpcClients.set(Client, this.createGRPCClient(Client));
    }

    return this.#grpcClients.get(Client) as Promise<T>;
  };

  private createGRPCClient = async <T extends GRPCClient>(
    Client: GRPCClientConstructor<T>
  ): Promise<T> => {
    const channelOverride: GRPCClientOptions["channelOverride"] = await this.getChannel();

    const client = new Client(
      null as never,
      null as never,
      {
        channelOverride,
      } as GRPCClientOptions
    );

    return client;
  };

  private getChannel = async (): Promise<Channel> => {
    if (this.#channel) {
      debug.connection("Using existing connection");
      return this.#channel;
    }

    this.#channel = this.createChannel();

    return this.#channel;
  };

  private createChannel = async (): Promise<Channel> => {
    const uri = await this.resolveUri();

    debug.connection(
      `Connecting to http${
        this.#channelCredentials._isSecure() ? "" : "s"
      }://%s`,
      uri
    );

    return new Channel(uri, this.#channelCredentials, {
      "grpc.keepalive_time_ms":
        this.#keepAliveInterval < 0
          ? Number.MAX_VALUE
          : this.#keepAliveInterval,
      "grpc.keepalive_timeout_ms":
        this.#keepAliveTimeout < 0 ? Number.MAX_VALUE : this.#keepAliveTimeout,
    });
  };

  private resolveUri = async (): Promise<string> => {
    if ("endpoint" in this.#connectionSettings) {
      const { endpoint } = this.#connectionSettings;
      return typeof endpoint === "string"
        ? endpoint
        : `${endpoint.address}:${endpoint.port}`;
    }

    const { address, port } = await discoverEndpoint(
      this.#connectionSettings,
      this.#channelCredentials
    );

    return `${address}:${port}`;
  };

  private createCredentialsMetadataGenerator = ({
    username,
    password,
  }: Credentials): Parameters<
    typeof grpcCredentials.createFromMetadataGenerator
  >[0] => (_, cb) => {
    const metadata = new Metadata();

    if (this.#insecure) {
      debug.connection(
        "Credentials are unsupported in insecure mode, and will be ignored."
      );
    } else {
      const auth = Buffer.from(`${username}:${password}`).toString("base64");
      metadata.add("authorization", `Basic ${auth}`);
    }

    return cb(null, metadata);
  };

  protected callArguments = (
    { credentials = this.#defaultCredentials, requiresLeader }: BaseOptions,
    callOptions?: CallOptions
  ): [Metadata, CallOptions] => {
    const metadata = new Metadata();
    const options = callOptions ? { ...callOptions } : {};

    if (requiresLeader) {
      metadata.add("requires-leader", "true");
    }

    if (credentials) {
      options.credentials = grpcCallCredentials.createFromMetadataGenerator(
        this.createCredentialsMetadataGenerator(credentials)
      );
    }

    return [metadata, options];
  };

  protected get throwOnAppendFailure(): boolean {
    return this.#throwOnAppendFailure;
  }
}
