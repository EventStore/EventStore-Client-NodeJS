import { Streams } from "./streams";
import { Persistent } from "./persistent";
import * as file from "fs";
import * as grpc from "grpc";
import { ESDBConnection, ClientConstructor } from "./types";

export { Streams, Persistent };

export * from "./types";

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
    if ((rootCertificate as string) !== undefined) {
      const filepath = rootCertificate as string;
      this._rootCertificate = file.readFileSync(filepath);
    } else {
      this._rootCertificate = rootCertificate as Buffer;
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
  build(uri: string): EventStoreConnection {
    return new EventStoreConnection(uri, this._rootCertificate);
  }
}

/**
 * Represents a connection to a single node. An EventStoreDB connection maintains a full duplex connection with a
 * server. An EventStoreDB connection operates quite differently than say a SQL connection. Normally when you use an
 * EventStoreDB connection, you want to keep the connection open for a much longer of time than when you use a SQL
 * connection.
 */
export class EventStoreConnection implements ESDBConnection {
  private _uri: string;
  private _rootCertificate?: Buffer;

  private _channel?: grpc.Channel;
  private _clients: Map<ClientConstructor<grpc.Client>, grpc.Client>;

  constructor(uri: string, rootCertificate?: Buffer) {
    this._uri = uri;
    this._rootCertificate = rootCertificate;
    this._clients = new Map();
  }

  /**
   * Returns a connection builder configured with default settings.
   */
  static builder(): EventStoreConnectionBuilder {
    return new EventStoreConnectionBuilder();
  }

  /**
   * Exposes the Streams API.
   */
  streams(): Streams {
    return new Streams(this);
  }

  /**
   * Exposes the Persistent Subscriptions API.
   */
  persistentSubscriptions(): Persistent {
    return new Persistent(this);
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
  _client = async <T extends grpc.Client>(
    Client: ClientConstructor<T>
  ): Promise<T> => {
    if (this._clients.has(Client)) {
      return this._clients.get(Client) as T;
    }

    const client = new Client(null as never, null as never, {
      channelOverride: this.channel,
    });

    this._clients.set(Client, client);

    return client;
  };

  private get channel(): grpc.Channel {
    if (this._channel) return this._channel;

    const credentials = this._rootCertificate
      ? grpc.credentials.createSsl(this._rootCertificate)
      : grpc.credentials.createInsecure();

    this._channel = new grpc.Channel(this._uri, credentials, {});

    return this._channel;
  }
}
