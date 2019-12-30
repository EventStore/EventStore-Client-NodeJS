import * as fs from "fs";
import * as streamsService from './generated/streams_grpc_pb';
import * as streams from './generated/streams_pb';
import * as grpc from "grpc";

type Nullable<T> = T | null;

export class EventStoreConnection {
    private _uri: string;
    private _username: string;
    private _password: string;
    private _connectionSettings: Nullable<ConnectionSettings>;
    private _service: streamsService.StreamsClient;

    constructor(uri: string, username: string, password: string, connectionSettings: Nullable<ConnectionSettings>) {
        this._uri = uri;
        this._username = username;
        this._password = password;
        this._connectionSettings = connectionSettings;

        let credentials = grpc.credentials.createInsecure();
        if (connectionSettings !== null) {
            if (connectionSettings.sslCertificate !== null) {
                let cert = fs.readFileSync(connectionSettings.sslCertificate);
                credentials = grpc.credentials.createSsl(cert);
                console.log('nope');


            }
       //     console.log('nope');
        }

        this._service = new streamsService.StreamsClient("localhost:2113", credentials);
    }

    appendToStream(
        streamName: string,
        streamRevision: StreamRevision,
        eventData: Array<EventData>) {

         let metadata = new grpc.Metadata();
         let auth = 'Basic ' + Buffer.from(this._username + ':' + this._password).toString('base64');
         metadata.set("authorization", auth);

         let appendCall = this._service.append(metadata,error => {
             console.log(error);
         });

         appendCall.on("error", err => {
             // HANDLE ERROR
         });

         let appendRequestOptions = new streams.AppendReq.Options();
         appendRequestOptions.setStreamName(streamName);
         appendRequestOptions.setAny(new streams.AppendReq.Empty());
         appendRequestOptions.clearRevision();

         let header = new streams.AppendReq();
         header.setOptions(appendRequestOptions);

         // CONSIDER LOGGING LEVELS
         appendCall.write(header);

         eventData.forEach(value => {
             let id = new streams.UUID();
             id.setString(value.eventId);
             
             let proposedMessage = new streams.AppendReq.ProposedMessage();
             proposedMessage.setId(id);
             
             proposedMessage.setData(value.data);
             
             proposedMessage.getMetadataMap().set("is-json", value.isJson.toString());
             proposedMessage.getMetadataMap().set("type", value.type);
             
             let event =  new streams.AppendReq();
             event.setProposedMessage(proposedMessage);
             appendCall.write(event);
         });
         
         appendCall.end();
         
//
//         let id = new streams.UUID();
//         id.setString("2cf92f7e-965f-4a39-a49a-c960b6f304d3");
//
//         proposedMessage.setId(id);
//
//         const encoder = new TextEncoder();
//         let data = encoder.encode('{"Id": "1"}');
//
//         proposedMessage.setData(new Uint8Array(data));
//         proposedMessage.getMetadataMap().set("is-json", "true");
//         proposedMessage.getMetadataMap().set("type", "simple");
//
//         let event = new streams.AppendReq();
//         event.setProposedMessage(proposedMessage);
//         console.log(event.toObject());
//         appendCall.write(event);
//
//         appendCall.end();
//        
    }
}

export class ConnectionSettings {
    sslCertificate: string;

    constructor(sslCertificate: string) {
        this.sslCertificate = sslCertificate;
    }
}

export class EventData {
    eventId: string;
    metadata: Uint8Array;
    type: string;
    data: Uint8Array;
    isJson: boolean;
    
    constructor(eventId: string, type: string, data: Uint8Array, metaData: Uint8Array = new Uint8Array(), isJson: boolean = true) {
        this.eventId = eventId;
        this.type = type;
        this.data = data;
        this.metadata = metaData;
        this.isJson = isJson;
    }   
}

export enum StreamRevision {
    NoStream = 1,
    Any = 2,
    StreamExists = 3
}



// READ 
// let readRequestOptions = new streams.ReadReq.Options();
// readRequestOptions.setReadDirection(streams.ReadReq.Options.ReadDirection.FORWARDS);
// readRequestOptions.setResolveLinks(false);
//
// let streamOptions = new streams.ReadReq.Options.StreamOptions();
// streamOptions.setRevision(0);
// streamOptions.setStreamName("test-stream");
// streamOptions.setStart(0);
// readRequestOptions.setStream(streamOptions);
//
// readRequestOptions.setCount(100);
// readRequestOptions.setNoFilter(new streams.ReadReq.Empty());
//
// let readRequest = new streams.ReadReq();
// readRequest.setOptions(readRequestOptions);
//
// console.log(readRequest.toObject());
//
//
//
// let readCall = service.read(readRequest, metadata);
//
// readCall.on("data", chunk => {
//     console.log(chunk);
// });
//
// readCall.on("status", chunk => {
//     console.log(chunk);
// });
//
// readCall.on('error', function(e) {
//    console.log(e);
// });
