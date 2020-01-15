import {AnyStreamRevision, EventStoreConnection} from "../index";
import * as types from "./types";
import * as grpc from "grpc";
import * as streams from "./generated/streams_pb";

export class Appends {
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: number, eventData: Array<types.EventData>, userCredentials: types.UserCredentials): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: Array<types.EventData>, userCredentials: types.UserCredentials): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: number, eventData: Array<types.EventData>): void;
    appendToStream(this: EventStoreConnection, streamName: string, expectedRevision: types.AnyStreamRevision, eventData: Array<types.EventData>): void;
    
    appendToStream(
        this: EventStoreConnection,
        streamName: string,
        expectedRevision: types.AnyStreamRevision | number,
        eventData: Array<types.EventData>,
        userCredentials?: types.UserCredentials): void {

        let username = this.username;
        let password = this.password;

        if (userCredentials != undefined) {
            username = userCredentials.username;
            password = userCredentials.password;
        }
        
       

        let metadata = new grpc.Metadata();
        let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        metadata.set("authorization", auth);

        let appendCall = this.service.append(metadata, error => {
            console.log(error);
        });

        appendCall.on("error", err => {
            // TODO: HANDLE ERROR
        });

        let appendRequestOptions = new streams.AppendReq.Options();
        appendRequestOptions.setStreamName(streamName);

        if (typeof expectedRevision === "number") {
            appendRequestOptions.setRevision(expectedRevision);
        } else {
            if(expectedRevision === AnyStreamRevision.Any) {
                appendRequestOptions.setAny(new streams.AppendReq.Empty);
            } else if (expectedRevision == AnyStreamRevision.NoStream) {
                appendRequestOptions.setNoStream(new streams.AppendReq.Empty);
            } else if (expectedRevision === AnyStreamRevision.StreamExists) {
                appendRequestOptions.setStreamExists(new streams.AppendReq.Empty);
            }
            appendRequestOptions.clearRevision();
        }
        
        let header = new streams.AppendReq();
        header.setOptions(appendRequestOptions);

        // CONSIDER LOGGING LEVELS
        appendCall.write(header);

        // TODO: Check concurrency
        // TODO: Make sure sensible error is returned from concurrency problems
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
}