import {EventStoreConnection} from "../index";
import * as types from "./types";
import * as grpc from "grpc";
import * as streams from "./generated/streams_pb";
import {ReadReq} from "./generated/streams_pb";
import {ReadResp} from "./generated/streams_pb";

export class Reads {
    readAllForwards(
        this: EventStoreConnection,
        position: types.Position,
        maxCount: number,
        resolveLinksTo: boolean,
        filter: types.Filter,
        userCredentials?: types.UserCredentials
    ): Promise<types.ResolvedEvent[]> {
        // TODO: Needs to handle filter
        // TODO: Override user credentials

        let metadata = new grpc.Metadata();
        let auth = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
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

        let uuidOption = new streams.ReadReq.Options.UUIDOption();
        uuidOption.setString(new ReadReq.Empty);
        readRequestOptions.setUuidOption(uuidOption);

        // TODO: User Agent


        readRequestOptions.setAll(allOptions);

        readRequestOptions.setCount(maxCount);

        readRequestOptions.setNoFilter(new streams.ReadReq.Empty());

        let readRequest = new streams.ReadReq();
        readRequest.setOptions(readRequestOptions);

        let readCall = this.service.read(readRequest, metadata);

        return new Promise<types.ResolvedEvent[]>((resolve, reject) => {

            let events = new Array<types.ResolvedEvent>();
            readCall.on("data", (chunk: streams.ReadResp) => {
                let event = Reads.convertToEventRecord(chunk.getEvent()?.getEvent());

                let resolvedEvent = new types.ResolvedEvent(event as types.EventRecord, null, null)
                if (event !== null) {
                    events.push(resolvedEvent);
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

    static convertToEventRecord(event: ReadResp.ReadEvent.RecordedEvent | undefined): types.EventRecord | null {
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