import { existsSync, readFileSync } from "fs";
import { isAbsolute, resolve } from "path";
import { Readable, Writable, Duplex, finished } from "stream";

import { v4 as uuid } from "uuid";

import {
  CallCredentials as grpcCallCredentials,
  CallOptions,
  Channel,
  ChannelCredentials,
  Client as GRPCClient,
  ClientOptions as GRPCClientOptions,
  credentials as grpcCredentials,
  Metadata,
  MethodDefinition,
} from "@grpc/grpc-js";
import {
  ClientWritableStreamImpl,
  ClientDuplexStreamImpl,
  ClientUnaryCallImpl,
  ClientReadableStreamImpl,
} from "@grpc/grpc-js/build/src/call";

import * as bridge from "@eventstore/db-client-bridge";

import type {
  NodePreference,
  GRPCClientConstructor,
  EndPoint,
  Credentials,
  BaseOptions,
} from "../types";

import {
  CancelledError,
  convertToCommandError,
  debug,
  NotLeaderError,
  UnavailableError,
} from "../utils";
import { discoverEndpoint } from "./discovery";
import { parseConnectionString } from "./parseConnectionString";
import { ServerFeatures } from "./ServerFeatures";
import { HTTP } from "./http";

interface ClientOptions {
  /**
   * The amount of time (in milliseconds) to wait after which a keepalive ping is sent on the transport.
   * Use -1 to disable.
   * @defaultValue 10_000
   */
  keepAliveInterval?: number;
  /**
   * The amount of time (in milliseconds) the sender of the keepalive ping waits for an acknowledgement.
   * If it does not receive an acknowledgment within this time, it will close the connection.
   * @defaultValue 10_000
   */
  keepAliveTimeout?: number;
  /**
   * Whether or not to immediately throw an exception when an append fails.
   * @defaultValue true
   */
  throwOnAppendFailure?: boolean;
  /**
   * An optional length of time (in milliseconds) to use for gRPC deadlines.
   * @defaultValue 10_000
   */
  defaultDeadline?: number;
  /**
   * The name of the connection to use in logs.
   * @defaultValue uuid
   */
  connectionName?: string;
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

// This type replaces ConnectionTypeOptions, is now internal.
type ConnectionSettings =
  | DNSClusterOptions
  | GossipClusterOptions
  | SingleNodeOptions;

export interface ChannelCredentialOptions {
  /**
   * Whether to use an insecure connection.
   */
  insecure?: boolean;
  /**
   * The root certificate data.
   */
  rootCertificate?: Buffer;
  /**
   * @deprecated Use the new {@link userKeyFile} instead.
   */
  privateKey?: Buffer;
  /**
   * @deprecated Use the new {@link userCertFile} instead.
   */
  certChain?: Buffer;
  /**
   * The file containing the user certificate’s matching private key in PEM format.
   */
  userKeyFile?: Buffer;
  /**
   * The file containing the X.509 user certificate in PEM format.
   */
  userCertFile?: Buffer;
  /**
   * Additional options to modify certificate verification.
   */
  verifyOptions?: Parameters<typeof ChannelCredentials.createSsl>[3];
}

interface NextChannelSettings {
  failedEndpoint: EndPoint;
  nextEndpoint?: EndPoint;
}

export class Client {
  #rustClient: bridge.RustClient;
  #throwOnAppendFailure: boolean;
  #connectionSettings: ConnectionSettings;
  #channelCredentials: ChannelCredentials;
  #insecure: boolean;
  #keepAliveInterval: number;
  #keepAliveTimeout: number;
  #defaultDeadline: number;

  #defaultCredentials?: Credentials;

  #nextChannelSettings?: NextChannelSettings;
  #channel?: Promise<Channel>;
  #serverFeatures?: Promise<ServerFeatures>;
  #grpcClients: Map<GRPCClientConstructor<GRPCClient>, Promise<GRPCClient>> =
    new Map();
  #http: HTTP;
  #connectionName: string;

  /**
   * Returns a connection from a connection string.
   * @param connectionString - The connection string for your database.
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

    if (options.userCertFile || options.userKeyFile) {
      if (!options.userCertFile || !options.userKeyFile) {
        throw new Error(
          "userCertFile must be given with accompanying userKeyFile"
        );
      }

      const certPathResolved = isAbsolute(options.userCertFile)
        ? options.userCertFile
        : resolve(process.cwd(), options.userCertFile);

      const certKeyPathResolved = isAbsolute(options.userKeyFile)
        ? options.userKeyFile
        : resolve(process.cwd(), options.userKeyFile);

      if (!existsSync(certPathResolved)) {
        throw new Error("Failed to load certificate file. File was not found.");
      }

      if (!existsSync(certKeyPathResolved)) {
        throw new Error(
          "Failed to load certificate key file. File was not found."
        );
      }

      channelCredentials.userKeyFile = readFileSync(certKeyPathResolved);
      channelCredentials.userCertFile = readFileSync(certPathResolved);
    }

    const rustClient = bridge.createClient(string);
    if (options.dnsDiscover) {
      const [discover] = options.hosts;

      if (options.hosts.length > 1) {
        debug.connection(
          `More than one address provided for discovery. Using first: ${discover.address}:${discover.port}.`
        );
      }

      return new Client(
        rustClient,
        {
          discover,
          nodePreference: options.nodePreference,
          discoveryInterval: options.discoveryInterval,
          gossipTimeout: options.gossipTimeout,
          maxDiscoverAttempts: options.maxDiscoverAttempts,
          throwOnAppendFailure: options.throwOnAppendFailure,
          keepAliveInterval: options.keepAliveInterval,
          keepAliveTimeout: options.keepAliveTimeout,
          defaultDeadline: options.defaultDeadline,
          connectionName: options.connectionName,
        },
        channelCredentials,
        options.defaultCredentials
      );
    }

    if (options.hosts.length > 1) {
      return new Client(
        rustClient,
        {
          endpoints: options.hosts,
          nodePreference: options.nodePreference,
          discoveryInterval: options.discoveryInterval,
          gossipTimeout: options.gossipTimeout,
          maxDiscoverAttempts: options.maxDiscoverAttempts,
          throwOnAppendFailure: options.throwOnAppendFailure,
          keepAliveInterval: options.keepAliveInterval,
          keepAliveTimeout: options.keepAliveTimeout,
          defaultDeadline: options.defaultDeadline,
          connectionName: options.connectionName,
        },
        channelCredentials,
        options.defaultCredentials
      );
    }

    return new Client(
      rustClient,
      {
        endpoint: options.hosts[0],
        throwOnAppendFailure: options.throwOnAppendFailure,
        keepAliveInterval: options.keepAliveInterval,
        keepAliveTimeout: options.keepAliveTimeout,
        defaultDeadline: options.defaultDeadline,
        connectionName: options.connectionName,
      },
      channelCredentials,
      options.defaultCredentials
    );
  }

  constructor(
    rustClient: bridge.RustClient,
    connectionSettings: DNSClusterOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    rustClient: bridge.RustClient,
    connectionSettings: GossipClusterOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    rustClient: bridge.RustClient,
    connectionSettings: SingleNodeOptions,
    channelCredentials?: ChannelCredentialOptions,
    defaultUserCredentials?: Credentials
  );
  constructor(
    rustClient: bridge.RustClient,
    {
      throwOnAppendFailure = true,
      keepAliveInterval = 10_000,
      keepAliveTimeout = 10_000,
      defaultDeadline = 10_000,
      connectionName = uuid(),
      ...connectionSettings
    }: ConnectionSettings,
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

    if (defaultDeadline <= 0) {
      throw new Error(
        `Invalid defaultDeadline "${defaultDeadline}". Please provide a positive integer.`
      );
    }

    if (channelCredentials.certChain || channelCredentials.privateKey) {
      console.warn(
        "The certChain and privateKey options have been deprecated and will be removed in the next major version. Please use userCertFile and userKeyFile instead."
      );
    }

    this.#rustClient = rustClient;
    this.#throwOnAppendFailure = throwOnAppendFailure;
    this.#keepAliveInterval = keepAliveInterval;
    this.#keepAliveTimeout = keepAliveTimeout;
    this.#defaultDeadline = defaultDeadline;
    this.#connectionSettings = connectionSettings;
    this.#insecure = !!channelCredentials.insecure;
    this.#defaultCredentials = defaultUserCredentials;
    this.#connectionName = connectionName;
    this.#http = new HTTP(this, channelCredentials, defaultUserCredentials);

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
        channelCredentials.userKeyFile ?? channelCredentials.privateKey,
        channelCredentials.userCertFile ?? channelCredentials.certChain,
        channelCredentials.verifyOptions
      );
    }
  }

  /**
   * The name of the connection to use in logs.
   * Can be set via {@link ClientOptions.connectionName} or `connectionName` in the connection string.
   */
  public get connectionName() {
    return this.#connectionName;
  }

  // Internal access to grpc client.
  private getGRPCClient = async <T extends GRPCClient>(
    Client: GRPCClientConstructor<T>,
    debugName: string
  ): Promise<T> => {
    if (this.#grpcClients.has(Client)) {
      debug.connection("Using existing grpc client for %s", debugName);
    } else {
      debug.connection("Creating client for %s", debugName);
      this.#grpcClients.set(Client, this.createGRPCClient(Client));
    }

    return this.#grpcClients.get(Client) as Promise<T>;
  };

  private disposableStreams: Set<Writable | Readable | Duplex> = new Set();

  // Internal handled execution
  protected GRPCStreamCreator =
    <Client extends GRPCClient, T extends Writable | Readable | Duplex>(
      Client: GRPCClientConstructor<Client>,
      debugName: string,
      creator: (client: Client) => T | Promise<T>,
      cache?: WeakMap<Client, T | Promise<T>>
    ) =>
    async (): Promise<T> => {
      const client = await this.getGRPCClient(Client, debugName);

      if (cache && cache.has(client)) return cache.get(client)!;

      const streamPromise = creator(client);

      cache?.set(client, streamPromise);

      const stream = await streamPromise;

      this.disposableStreams.add(stream);

      finished(stream, (err) => {
        cache?.delete(client);
        this.disposableStreams.delete(stream);
        if (err) this.handleError(client, err);
      });

      return stream;
    };

  public dispose = async () => {
    debug.command(`Disposing ${this.disposableStreams.size} streams.`);

    const promises = [];

    for (const stream of this.disposableStreams) {
      promises.push(
        new Promise((resolve) => {
          finished(stream, resolve);
        })
      );

      if (
        stream instanceof ClientWritableStreamImpl ||
        stream instanceof ClientDuplexStreamImpl ||
        stream instanceof ClientUnaryCallImpl ||
        stream instanceof ClientReadableStreamImpl
      ) {
        stream.cancel();
      } else {
        stream.destroy();
      }
    }

    await Promise.allSettled(promises);

    debug.command(`Disposed ${promises.length} streams.`);
  };

  // Internal handled execution
  protected execute = async <Client extends GRPCClient, T>(
    Client: GRPCClientConstructor<Client>,
    debugName: string,
    action: (client: Client) => Promise<T>
  ): Promise<T> => {
    const client = await this.getGRPCClient(Client, debugName);
    try {
      return await action(client);
    } catch (error) {
      this.handleError(client, error);
      throw error;
    }
  };

  protected get HTTPRequest() {
    return this.#http.request;
  }

  protected getChannel = async (): Promise<Channel> => {
    if (this.#channel) {
      debug.connection("Using existing connection");
      return this.#channel;
    }

    this.#channel = this.createChannel();

    return this.#channel;
  };

  private createGRPCClient = async <T extends GRPCClient>(
    Client: GRPCClientConstructor<T>
  ): Promise<T> => {
    const channelOverride: GRPCClientOptions["channelOverride"] =
      await this.getChannel();

    const client = new Client(
      null as never,
      null as never,
      {
        channelOverride,
      } as GRPCClientOptions
    );

    return client;
  };

  private shouldReconnect = (
    err: Error
  ): [shouldReconnect: boolean, to?: EndPoint] => {
    const error = convertToCommandError(err);

    if (error instanceof NotLeaderError) {
      return [true, error.leader];
    }

    return [
      // Server is unavailable to take request
      error instanceof UnavailableError ||
        // Server has cancelled a long running request
        error instanceof CancelledError,
    ];
  };

  protected handleError = async (
    client: GRPCClient,
    error: Error
  ): Promise<void> => {
    const [shouldReconnect, nextEndpoint] = this.shouldReconnect(error);

    if (!shouldReconnect) return;

    debug.connection("Got reconnection error", error.message);

    const failedChannel = client.getChannel();
    const currentChannel = await this.#channel;
    if (failedChannel !== currentChannel) {
      debug.connection("Channel already reconnected");
      return;
    }

    debug.connection(
      `Reconnection required${nextEndpoint ? ` to: ${nextEndpoint}` : ""}`
    );

    const [_protocol, address, port] = failedChannel.getTarget().split(":");

    failedChannel.close();
    this.#grpcClients.clear();
    this.#channel = undefined;
    this.#serverFeatures = undefined;
    this.#nextChannelSettings = {
      failedEndpoint: {
        address,
        port: Number.parseInt(port),
      },
      nextEndpoint,
    };
  };

  private createChannel = async (): Promise<Channel> => {
    const uri = await this.resolveUri();

    debug.connection(
      `Connecting to http${
        this.#channelCredentials._isSecure() ? "s" : ""
      }://%s`,
      uri
    );

    this.#nextChannelSettings = undefined;
    return new Channel(uri, this.#channelCredentials, {
      "grpc.keepalive_time_ms":
        this.#keepAliveInterval < 0
          ? Number.MAX_VALUE
          : this.#keepAliveInterval,
      "grpc.keepalive_timeout_ms":
        this.#keepAliveTimeout < 0 ? Number.MAX_VALUE : this.#keepAliveTimeout,
      // EventStore allows events of up to 16mb to be written internally.
      // While you can't write events this large through gRPC, you could do so through the TCP client, or through projections.
      // To allow the client to read any event that EventStoreDB was able to write, we want to hardcode the max receive message length to 17mb.
      "grpc.max_receive_message_length": 17 * 1024 * 1024,
    });
  };

  protected resolveUri = async (): Promise<string> => {
    if (this.#nextChannelSettings?.nextEndpoint) {
      const { address, port } = this.#nextChannelSettings.nextEndpoint;
      return `${address}:${port}`;
    }

    if ("endpoint" in this.#connectionSettings) {
      const { endpoint } = this.#connectionSettings;
      return typeof endpoint === "string"
        ? endpoint
        : `${endpoint.address}:${endpoint.port}`;
    }

    try {
      const { address, port } = await discoverEndpoint(
        this.#connectionSettings,
        this.#channelCredentials,
        this.#nextChannelSettings?.failedEndpoint
      );
      return `${address}:${port}`;
    } catch (error) {
      this.#grpcClients.clear();
      this.#channel = undefined;
      throw error;
    }
  };

  private createCredentialsMetadataGenerator =
    ({
      username,
      password,
    }: Credentials): Parameters<
      typeof grpcCredentials.createFromMetadataGenerator
    >[0] =>
    (_, cb) => {
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
    {
      credentials = this.#defaultCredentials,
      requiresLeader,
      deadline,
    }: BaseOptions,
    callOptions?: CallOptions
  ): [Metadata, CallOptions] => {
    const metadata = new Metadata();
    const options = callOptions ? { ...callOptions } : {};

    metadata.add("connection-name", this.#connectionName);

    if (requiresLeader) {
      metadata.add("requires-leader", "true");
    }

    if (credentials) {
      options.credentials = grpcCallCredentials.createFromMetadataGenerator(
        this.createCredentialsMetadataGenerator(credentials)
      );
    }

    options.deadline = options.deadline ?? this.createDeadline(deadline);

    return [metadata, options];
  };

  protected createDeadline(deadline: number = this.#defaultDeadline): Date {
    // grpcJS chokes on an invalid date, so we cap the deadline to max 1 year.
    return new Date(Date.now() + Math.min(deadline, 0x757b12c00));
  }

  protected get capabilities(): Promise<ServerFeatures> {
    if (!this.#serverFeatures) {
      debug.command("Fetching server capabilities");
      this.#serverFeatures = this.execute(
        ...ServerFeatures.createServerFeatures
      );
    }
    return this.#serverFeatures;
  }

  protected supports = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    method: MethodDefinition<any, any>,
    feature?: string
  ): Promise<boolean> => (await this.capabilities).supports(method, feature);

  protected get throwOnAppendFailure(): boolean {
    return this.#throwOnAppendFailure;
  }

  protected get rustClient(): bridge.RustClient {
    return this.#rustClient;
  }
}
