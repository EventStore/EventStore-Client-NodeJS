import * as fs from "fs";
import * as streamsService from './generated/streams_grpc_pb';
import * as streams from './generated/streams_pb';
import * as grpc from "grpc";
import * as types from "./types";
import {ReadResp} from "./generated/streams_pb";

type Nullable<T> = T | null;

export class EventStoreConnection {
    private _uri: string;
    private _username: string;
    private _password: string;
    private _connectionSettings: Nullable<types.ConnectionSettings>;
    private _service: streamsService.StreamsClient;

    constructor(uri: string, username: string, password: string, connectionSettings: types.ConnectionSettings | null) {
        this._uri = uri;
        this._username = username;
        this._password = password;
        this._connectionSettings = connectionSettings;

        let credentials = grpc.credentials.createInsecure();
        if (connectionSettings !== null) {
            if (connectionSettings.sslCertificate !== null) {
                let cert = fs.readFileSync(connectionSettings.sslCertificate);
                credentials = grpc.credentials.createSsl(cert);
            }
        }

        this._service = new streamsService.StreamsClient("localhost:2113", credentials);
    }

    appendToStream(
        streamName: string,
        streamRevision: types.AnyStreamRevision,
        eventData: Array<types.EventData>) {

        let metadata = new grpc.Metadata();
        let auth = 'Basic ' + Buffer.from(this._username + ':' + this._password).toString('base64');
        metadata.set("authorization", auth);

        let appendCall = this._service.append(metadata, error => {
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

            let event = new streams.AppendReq();
            event.setProposedMessage(proposedMessage);
            appendCall.write(event);
        });

        appendCall.end();
    }

    async readAllForwards(
        position: types.Position,
        maxCount: number,
        resolveLinksTo: boolean,
        filter: types.Filter,
        userCredentials: types.UserCredentials
    ): Promise<object[]> {
        let metadata = new grpc.Metadata();
        let auth = 'Basic ' + Buffer.from(this._username + ':' + this._password).toString('base64');
        metadata.set("authorization", auth);

        let readRequestOptions = new streams.ReadReq.Options();

        readRequestOptions.setReadDirection(streams.ReadReq.Options.ReadDirection.FORWARDS);
        readRequestOptions.setResolveLinks(resolveLinksTo);

        let allOptions = new streams.ReadReq.Options.AllOptions();

        if (position.isEnd()) {
            allOptions.setEnd(new streams.ReadReq.Empty);
        } else if (position.isStart()) {
            allOptions.setStart(new streams.ReadReq.Empty);
        } else {
            let reqPosition = new streams.ReadReq.Options.Position();
            reqPosition.setCommitPosition(position.commitPosition);
            reqPosition.setPreparePosition(position.preparePosition);
            allOptions.setPosition(reqPosition)
        }

        readRequestOptions.setAll(allOptions);

        readRequestOptions.setCount(maxCount);

        readRequestOptions.setNoFilter(new streams.ReadReq.Empty());

        let readRequest = new streams.ReadReq();
        readRequest.setOptions(readRequestOptions);

        let readCall = this._service.read(readRequest, metadata);

        return new Promise<types.EventRecord[]>((resolve, reject) => {

            let events = new Array<types.EventRecord>();
            readCall.on("data", (chunk: streams.ReadResp) => {
                let event = this.convertToEventRecord(chunk.getEvent()?.getEvent());
                
                if (event !== null) {
                    events.push(event);
                }
            });

            readCall.on('error', (e: Error) => {
                reject(e);
            });

            readCall.on('end', () => {
                resolve(events);
            })
        });
    }

    convertToEventRecord(event: ReadResp.ReadEvent.RecordedEvent | undefined) : types.EventRecord | null {
        if (event === undefined) {
            return null;
        }

        let isJson = event.getMetadataMap().get('is-json') as string;
        let eventType = event.getMetadataMap().get('type') as string;

        return new types.EventRecord(
            event.getStreamName(),
            event.getId()?.getString() as string,
            event.getStreamRevision(),
            eventType,
            event.getData_asU8(),
            event.getCustomMetadata_asU8(),
            new Date(),
            new types.Position(event.getCommitPosition(), event.getPreparePosition()),
            isJson == 'True',
        )
    }
}

export * from './types'




