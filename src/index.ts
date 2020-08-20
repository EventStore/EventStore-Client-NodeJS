import { Streams } from "./streams";
import { Persistent } from "./persistent";
import * as file from "fs";

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
   * Enable a secured connection with the server while using the self-signed certificate used by EventStoreDB in dev
   * mode.
   */
  sslDevMode(): EventStoreConnectionBuilder {
    return this.sslRootCertificate(`${__dirname}/../dev-ca/ca.pem`);
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
export class EventStoreConnection {
  private _uri: string;
  private _rootCertificate?: Buffer;

  constructor(uri: string, rootCertificate?: Buffer) {
    this._uri = uri;
    this._rootCertificate = rootCertificate;
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
    return new Streams(this._uri, this._rootCertificate);
  }

  /**
   * Exposes the Persistent Subscriptions API.
   */
  persistentSubscriptions(): Persistent {
    return new Persistent(this._uri, this._rootCertificate);
  }
}
