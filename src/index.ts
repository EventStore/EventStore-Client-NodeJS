import { Streams } from "./streams";
import { Persistent } from "./persistent";
import * as file from "fs";

export class EventStoreConnectionBuilder {
  private _rootCertificate?: Buffer;

  sslRootCertificate(rootCertificate: Buffer | string): EventStoreConnectionBuilder {
    if ((rootCertificate as string) !== undefined) {
      const filepath = rootCertificate as string;
      this._rootCertificate = file.readFileSync(filepath);
    } else {
      this._rootCertificate = rootCertificate as Buffer;
    }

    return this;
  }

  sslDevMode(): EventStoreConnectionBuilder {
    return this.sslRootCertificate(`${__dirname}/../dev-ca/ca.pem`);
  }

  // Default mode.
  insecure(): EventStoreConnectionBuilder {
    return this;
  }

  build(uri: string): EventStoreConnection {
    return new EventStoreConnection(uri, this._rootCertificate);
  }
}

export class EventStoreConnection {
  private _uri: string;
  private _rootCertificate?: Buffer;

  constructor(uri: string, rootCertificate?: Buffer) {
    this._uri = uri;
    this._rootCertificate = rootCertificate;
  }

  static builder(): EventStoreConnectionBuilder {
    return new EventStoreConnectionBuilder();
  }

  streams(): Streams {
    return new Streams(this._uri, this._rootCertificate);
  }

  persistentSubscriptions(): Persistent {
    return new Persistent(this._uri, this._rootCertificate);
  }
}
