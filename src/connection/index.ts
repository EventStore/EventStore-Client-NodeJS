import { readFileSync } from "fs";
import {
  Channel,
  ChannelCredentials,
  Client,
  ClientOptions,
  credentials as grpcCredentials,
} from "@grpc/grpc-js";

import {
  NodePreference,
  ESDBConnection,
  ClientConstructor,
  EndPoint,
  Credentials,
  VerifyOptions,
} from "../types";
import { debug } from "../utils/debug";
import { CLIENT, DEFAULT_CREDENTIALS } from "../symbols";

import { discoverEndpoint } from "./discovery";
import { parseConnectionString } from "./parseConnectionString";

/**
 * Helps constructing an EventStoreDB connection.
 */
export class EventStoreConnectionBuilder {
  private _insecure = false;
  private _rootCertificate?: Buffer;
  private _privateKey?: Buffer;
  private _certChain?: Buffer;
  private _verifyOptions?: VerifyOptions;
  private _defaultCredentials?: Credentials;

  /**
   * Sets default credentials to be used for each command.
   * @param credentials
   */
  public defaultCredentials({
    username,
    password,
  }: Credentials): EventStoreConnectionBuilder {
    this._defaultCredentials = { username, password };
    return this;
  }

  /**
   * Use an insecure connection to the server. We do not advise using this mode while executing
   * authenticated commands as your credentials will be visible on the network.
   */
  public insecure(): EventStoreConnectionBuilder {
    this._insecure = true;
    return this;
  }

  /**
   * Use an secure connection to the server. Default behaviour
   */
  public secure(): EventStoreConnectionBuilder {
    this._insecure = false;
    return this;
  }

  /**
   * Use a rool SSL Certificate
   * @param rootCertificate A filepath to a certificate file or the content of a certificated file.
   */
  public sslRootCertificate(
    rootCertificate: Buffer | string
  ): EventStoreConnectionBuilder {
    if (typeof rootCertificate === "string") {
      debug.connection(
        `Importing root certificate from path "%s"`,
        rootCertificate
      );
      this._rootCertificate = readFileSync(rootCertificate);
    } else {
      debug.connection("Using root certificate from buffer");
      this._rootCertificate = rootCertificate;
    }

    return this;
  }

  /**
   * Use a private key
   * @param privateKey A filepath to a private key or the content of a private key file.
   */
  public privateKey(privateKey: Buffer | string): EventStoreConnectionBuilder {
    if (typeof privateKey === "string") {
      debug.connection(`Importing private key from path "%s"`, privateKey);
      this._privateKey = readFileSync(privateKey);
    } else {
      debug.connection("Using private key from buffer");
      this._privateKey = privateKey;
    }

    return this;
  }

  /**
   * Use a certificate chain
   * @param certChain A filepath to a certificate chain or the content of a certificate chain file.
   */
  public certChain(certChain: Buffer | string): EventStoreConnectionBuilder {
    if (typeof certChain === "string") {
      debug.connection(`Importing certificate chain from path "%s"`, certChain);
      this._certChain = readFileSync(certChain);
    } else {
      debug.connection("Using certificate chain from buffer");
      this._certChain = certChain;
    }

    return this;
  }

  /**
   * Verify Connection Options
   * @param VerifyOptions
   */
  public verifyConnectionOptions(
    verifyOptions: VerifyOptions
  ): EventStoreConnectionBuilder {
    debug.connection("Setting verifyOptions");
    this._verifyOptions = verifyOptions;
    return this;
  }

  /**
   * Creates an EventStoreDB connection.
   * @param uri The URI must not contain any protocol. Here's an valid example `localhost:2113`.
   */
  public singleNodeConnection(uri: string | EndPoint): EventStoreConnection {
    return new EventStoreConnection(
      {
        endpoint: uri,
      },
      this.channelCredentialSettings(),
      this._defaultCredentials
    );
  }

  /**
   * Creates an EventStoreDB connection.
   * @param endpoints An array of cluster endpoints.
   */
  public gossipClusterConnection(
    endpoints: EndPoint[],
    nodePreference?: NodePreference
  ): EventStoreConnection {
    return new EventStoreConnection(
      {
        endpoints,
        nodePreference,
      },
      this.channelCredentialSettings(),
      this._defaultCredentials
    );
  }

  /**
   * Creates an EventStoreDB connection.
   * @param domain
   */
  public dnsClusterConnection(
    domain: string,
    nodePreference?: NodePreference
  ): EventStoreConnection {
    return new EventStoreConnection(
      {
        domain,
        nodePreference,
      },
      this.channelCredentialSettings(),
      this._defaultCredentials
    );
  }

  private channelCredentialSettings = (): ChannelCredentialsSettings =>
    this._insecure
      ? { insecure: this._insecure }
      : {
          insecure: this._insecure,
          rootCertificate: this._rootCertificate,
          privateKey: this._privateKey,
          certChain: this._certChain,
          verifyOptions: this._verifyOptions,
        };
}

export type ClusterSettings =
  | {
      domain: string;
      nodePreference?: NodePreference;
    }
  | {
      endpoints: EndPoint[];
      nodePreference?: NodePreference;
    };

export type ConnectionSettings =
  | ClusterSettings
  | {
      endpoint: EndPoint | string;
    };

export type ChannelCredentialsSettings =
  | {
      insecure: true;
    }
  | {
      insecure: false;
      rootCertificate?: Buffer;
      privateKey?: Buffer;
      certChain?: Buffer;
      verifyOptions?: VerifyOptions;
    };

const createGRPCCredentials = (
  settings: ChannelCredentialsSettings
): ChannelCredentials => {
  debug.connection("Using credentials %O", settings);

  if (settings.insecure) {
    return grpcCredentials.createInsecure();
  }

  return grpcCredentials.createSsl(
    settings.rootCertificate,
    settings.privateKey,
    settings.certChain,
    settings.verifyOptions
  );
};

/**
 * Represents a connection to a single node. An EventStoreDB connection maintains a full duplex connection with a
 * server. An EventStoreDB connection operates quite differently than say a SQL connection. Normally when you use an
 * EventStoreDB connection, you want to keep the connection open for a much longer of time than when you use a SQL
 * connection.
 */
export class EventStoreConnection implements ESDBConnection {
  private _connectionSettings: ConnectionSettings;
  private _channelCredentials: ChannelCredentials;
  private _defaultCredentials?: Credentials;

  private _channel?: Channel;
  private _clients: Map<ClientConstructor<Client>, Client>;

  constructor(
    settings: ConnectionSettings,
    channelCredentialsSettings: ChannelCredentialsSettings,
    defaultCredentials?: Credentials
  ) {
    this._connectionSettings = settings;
    this._channelCredentials = createGRPCCredentials(
      channelCredentialsSettings
    );
    this._defaultCredentials = defaultCredentials;
    this._clients = new Map();
  }

  /**
   * Returns a connection builder configured with default settings.
   */
  static builder(): EventStoreConnectionBuilder {
    return new EventStoreConnectionBuilder();
  }

  /**
   * Returns a connection from a connection string.
   * @param connectionString
   */
  static connectionString(
    connectionString: TemplateStringsArray | string,
    ...parts: string[]
  ): EventStoreConnection {
    const string: string = Array.isArray(connectionString)
      ? connectionString.reduce<string>(
          (acc, chunk, i) => `${acc}${chunk}${parts[i] ?? ""}`,
          ""
        )
      : (connectionString as string);

    debug.connection(`Using connection string: ${string}`);

    const options = parseConnectionString(string);
    const builder = new EventStoreConnectionBuilder();

    if (options.tls) {
      builder.secure();
    } else {
      builder.insecure();
    }

    if (options.defaultCredentials) {
      builder.defaultCredentials(options.defaultCredentials);
    }

    if (options.dnsDiscover) {
      const { address } = options.hosts[0];

      if (options.hosts.length > 1) {
        debug.connection(
          `More than one address provided for discovery. Using first: ${address}.`
        );
      }

      return builder.dnsClusterConnection(address, options.nodePreference);
    }

    if (options.hosts.length > 1) {
      return builder.gossipClusterConnection(
        options.hosts,
        options.nodePreference
      );
    }

    return builder.singleNodeConnection(options.hosts[0]);
  }

  /**
   * Closes the connection
   * Equivalent to {@link Persistent.close} or {@link Streams.close}
   */
  close = async (): Promise<void> => {
    this._channel?.close();
    delete this._channel;
    this._clients = new Map();
  };

  /**
   * internal access to default credentials
   */
  [DEFAULT_CREDENTIALS] = (): Credentials | undefined => {
    return this._defaultCredentials;
  };

  /**
   * internal access to grpc client.
   */
  [CLIENT] = async <T extends Client>(
    Client: ClientConstructor<T>,
    debugName: string
  ): Promise<T> => {
    if (this._clients.has(Client)) {
      debug.connection("Using existing client for %s", debugName);
      return this._clients.get(Client) as T;
    }

    debug.connection("Createing client for %s", debugName);

    const channelOverride: ClientOptions["channelOverride"] = await this.getChannel();

    const client = new Client(
      null as never,
      null as never,
      {
        channelOverride,
      } as ClientOptions
    );

    this._clients.set(Client, client);

    return client;
  };

  private getChannel = async () => {
    if (this._channel) {
      debug.connection("Using existing connection");
      return this._channel;
    }

    const uri = await this.resolveUri();

    debug.connection(
      `Connecting to http${
        this._channelCredentials._isSecure() ? "" : "s"
      }://%s`,
      uri
    );

    this._channel = new Channel(uri, this._channelCredentials, {});

    return this._channel;
  };

  private resolveUri = async (): Promise<string> => {
    if ("endpoint" in this._connectionSettings) {
      return typeof this._connectionSettings.endpoint === "string"
        ? this._connectionSettings.endpoint
        : `${this._connectionSettings.endpoint.address}:${this._connectionSettings.endpoint.port}`;
    }

    const { address, port } = await discoverEndpoint(
      this._connectionSettings,
      this._channelCredentials
    );

    return `${address}:${port}`;
  };
}
