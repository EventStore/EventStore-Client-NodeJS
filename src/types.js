"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResolvedEvent = /** @class */ (function () {
    function ResolvedEvent(event, link, commitPosition) {
        var _a;
        this.event = event;
        this.link = link;
        this.originalEvent = (_a = this.event, (_a !== null && _a !== void 0 ? _a : this.link));
        this.originalStreamId = this.originalEvent.eventStreamId;
        this.originalEventNumber = this.originalEvent.eventNumber;
        if (commitPosition !== null) {
            this.originalPosition = new Position(commitPosition, this.originalEvent.position.preparePosition);
        }
        else {
            this.originalPosition = null;
        }
    }
    return ResolvedEvent;
}());
exports.ResolvedEvent = ResolvedEvent;
var StreamRevision = /** @class */ (function () {
    function StreamRevision() {
    }
    return StreamRevision;
}());
exports.StreamRevision = StreamRevision;
var EventRecord = /** @class */ (function () {
    function EventRecord(eventStreamId, eventId, eventNumber, eventType, data, metadata, created, position, isJson) {
        this.eventStreamId = eventStreamId;
        this.eventId = eventId;
        this.eventNumber = eventNumber;
        this.eventType = eventType;
        this.data = data;
        this.metadata = metadata;
        this.created = created;
        this.position = position;
        this.isJson = isJson;
    }
    return EventRecord;
}());
exports.EventRecord = EventRecord;
var Position = /** @class */ (function () {
    function Position(commitPosition, preparePosition) {
        if (commitPosition < preparePosition) {
            throw Error('The commit position cannot be less than the prepare position');
        }
        this.commitPosition = commitPosition;
        this.preparePosition = preparePosition;
    }
    Position.prototype.isEnd = function () {
        return this.commitPosition == Number.MAX_VALUE && this.preparePosition === Number.MAX_VALUE;
    };
    Position.prototype.isStart = function () {
        return this.commitPosition == 0 && this.preparePosition === 0;
    };
    Position.start = new Position(0, 0);
    Position.end = new Position(Number.MAX_VALUE, Number.MAX_VALUE);
    return Position;
}());
exports.Position = Position;
var Filter = /** @class */ (function () {
    function Filter() {
    }
    return Filter;
}());
exports.Filter = Filter;
var ConnectionSettings = /** @class */ (function () {
    function ConnectionSettings(sslCertificate) {
        this.sslCertificate = sslCertificate;
    }
    return ConnectionSettings;
}());
exports.ConnectionSettings = ConnectionSettings;
var EventData = /** @class */ (function () {
    function EventData(eventId, type, data, metaData, isJson) {
        if (metaData === void 0) { metaData = new Uint8Array(); }
        if (isJson === void 0) { isJson = true; }
        this.eventId = eventId;
        this.type = type;
        this.data = data;
        this.metadata = metaData;
        this.isJson = isJson;
    }
    return EventData;
}());
exports.EventData = EventData;
var AnyStreamRevision;
(function (AnyStreamRevision) {
    AnyStreamRevision[AnyStreamRevision["NoStream"] = 1] = "NoStream";
    AnyStreamRevision[AnyStreamRevision["Any"] = 2] = "Any";
    AnyStreamRevision[AnyStreamRevision["StreamExists"] = 3] = "StreamExists";
})(AnyStreamRevision = exports.AnyStreamRevision || (exports.AnyStreamRevision = {}));
