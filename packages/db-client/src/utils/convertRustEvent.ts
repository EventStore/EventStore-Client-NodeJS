import type {
    EventType,
    EventTypeToRecordedEvent,
    LinkEvent,
    ResolvedEvent,
} from "../types";

import { debug } from "./debug";
import * as bridge from "@eventstore/db-client-bridge";

export const convertRustEvent = <T extends ResolvedEvent>(
    rustClient: bridge.ResolvedEvent
): T => {
    const resolved: ResolvedEvent = {};

    if (rustClient.event != undefined) {
        resolved.event = convertRustRecord(rustClient.event);
    }

    if (rustClient.link != undefined) {
        resolved.link = convertRustRecord<LinkEvent>(rustClient.link);
    }

    if (rustClient.commitPosition != undefined) {
        resolved.commitPosition = rustClient.commitPosition;
    }

    return resolved as T;
};

const safeParseJSON = <T = unknown>(
    str: string,
    fallback: (str: string) => T,
    errorMessage: string
): T => {
    try {
        const parsed = JSON.parse(str);
        return parsed;
    } catch (error) {
        debug.events(errorMessage);
        return fallback(str);
    }
};

const parseMetadata = (rustEvent: bridge.RecordedEvent, id: string) => {
    const metadata = rustEvent.metadata;
    if (!metadata.length) return;
    try {
        return JSON.parse(Buffer.from(metadata).toString("utf8"));
    } catch (error) {
        return metadata;
    }
};

export const convertRustRecord = <E extends EventType = EventType>(
    rustEvent: bridge.RecordedEvent
): EventTypeToRecordedEvent<E> => {
    const type = rustEvent.type;
    const streamId = rustEvent.streamId;
    const id = rustEvent.id;
    const created = rustEvent.created;
    const revision = rustEvent.revision;
    const metadata: E["metadata"] = parseMetadata(rustEvent, id);
    const isJson = rustEvent.isJson;

    const position = rustEvent.position;

    if (isJson) {
        const dataStr = Buffer.from(rustEvent.data).toString("utf8");

        const data = safeParseJSON<E["data"]>(
            dataStr,
            (d) => d,
            `Malformed JSON data in event ${id}`
        );

        return {
            streamId,
            id,
            revision,
            type,
            data,
            metadata,
            isJson,
            created,
            position,
        } as EventTypeToRecordedEvent<E>;
    }

    const data = rustEvent.data;

    return {
        streamId,
        id,
        revision,
        type,
        data,
        metadata,
        isJson,
        created,
        position,
    } as EventTypeToRecordedEvent<E>;
};
