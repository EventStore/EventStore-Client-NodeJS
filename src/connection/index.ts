import { readFileSync } from "fs";
import {
  Channel,
  Client,
  ClientOptions,
  credentials as grpcCredentials,
} from "@grpc/grpc-js";
import { discoverEndpoint } from "./discovery";
import {
  NodePreference,
  ESDBConnection,
  ClientConstructor,
  EndPoint,
} from "../types";
import { debug } from "../utils/debug";

/**
 * Helps constructing an EventStoreDB connection.
 */
export class EventStoreConnectionBuilder {
  private _rootCertificate?: Buffer;

  /**
   * Enable a secured connection with the server.
   * @param rootCertificate A filepath to a certificate file or the content of a certificated file.
   */
  sslRootCertificate(
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
   * Default behavior. Use an insecure connection to the server. We do not advise using this mode while executing
   * authenticated commands as your credentials will be visible on the network.
   */
  insecure(): EventStoreConnectionBuilder {
    return this;
  }

  /**
   * Creates an EventStoreDB connection.
   * @param uri The URI must not contain any protocol. Here's an valid example `localhost:2113`.
   */
  singleNodeConnection(uri: string | EndPoint): EventStoreConnection {
    return new EventStoreConnection(
      {
        endpoint: uri,
      },
      this._rootCertificate
    );
  }

  /**
   * Creates an EventStoreDB connection.
   * @param endpoints An array of cluster endpoints.
   */
  gossipClusterConnection(
    endpoints: EndPoint[],
    nodePreference?: NodePreference
  ): EventStoreConnection {
    return new EventStoreConnection(
      {
        endpoints,
        nodePreference,
      },
      this._rootCertificate
    );
  }

  /**
   * Creates an EventStoreDB connection.
   * @param domain
   */
  dnsClusterConnection(
    domain: string,
    nodePreference?: NodePreference
  ): EventStoreConnection {
    return new EventStoreConnection(
      {
        domain,
        nodePreference,
      },
      this._rootCertificate
    );
  }
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

/**
 * Represents a connection to a single node. An EventStoreDB connection maintains a full duplex connection with a
 * server. An EventStoreDB connection operates quite differently than say a SQL connection. Normally when you use an
 * EventStoreDB connection, you want to keep the connection open for a much longer of time than when you use a SQL
 * connection.
 */
export class EventStoreConnection implements ESDBConnection {
  private _settings: ConnectionSettings;
  private _rootCertificate?: Buffer;

  private _channel?: Channel;
  private _clients: Map<ClientConstructor<Client>, Client>;

  constructor(settings: ConnectionSettings, rootCertificate?: Buffer) {
    this._rootCertificate = rootCertificate;
    this._settings = settings;
    this._clients = new Map();
  }

  /**
   * Returns a connection builder configured with default settings.
   */
  static builder(): EventStoreConnectionBuilder {
    return new EventStoreConnectionBuilder();
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
   * internal access to grpc client.
   */
  _client = async <T extends Client>(
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

    debug.connection("Creating new connection");

    const uri = await this.resolveUri();

    debug.connection(
      `Connecting to http${this._rootCertificate ? "s" : ""}://%s`,
      uri
    );

    const credentials = this._rootCertificate
      ? grpcCredentials.createSsl(this._rootCertificate)
      : grpcCredentials.createInsecure();

    this._channel = new Channel(uri, credentials, {});

    return this._channel;
  };

  private resolveUri = async (): Promise<string> => {
    if ("endpoint" in this._settings) {
      return typeof this._settings.endpoint === "string"
        ? this._settings.endpoint
        : `${this._settings.endpoint.address}:${this._settings.endpoint.port}`;
    }

    const { address, port } = await discoverEndpoint(
      this._settings,
      this._rootCertificate
    );

    return `${address}:${port}`;
  };
}
