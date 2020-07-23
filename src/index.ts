// import * as fs from "fs";
import { Streams } from "./streams";
// import * as streams from "./generated/streams_pb";
// import { ReadReq, ReadResp } from "./generated/streams_pb";
//import {Appends} from "./src/append";
//import {Reads} from "./src/reads";

//const streams_service = require('./src/generated/streams_grpc_pb');

export class EventStoreConnectionBuilder {
  build(uri: string): EventStoreConnection {
    return new EventStoreConnection(uri);
  }
}

export class EventStoreConnection {
  // TODO: We need to handle logging levels
  private _uri: string;

  // protected service: streamsService.StreamsClient;
  //
  // appendToStream = Appends.prototype.appendToStream;
  //
  // readAllForwards = Reads.prototype.readAllForwards;

  constructor(uri: string) {
    this._uri = uri;

    //let credentials = grpc.credentials.createInsecure();
    // if (connectionSettings !== null) {
    //     if (connectionSettings.sslCertificate !== null) {
    //         let cert = fs.readFileSync(connectionSettings.sslCertificate);
    //         credentials = grpc.credentials.createSsl(cert);
    //     }
    // }

    //this.service = new streamsService.StreamsClient("localhost:2113", credentials);
  }

  static builder(): EventStoreConnectionBuilder {
    return new EventStoreConnectionBuilder();
  }

  streams(): Streams {
    return new Streams(this._uri);
  }
}
