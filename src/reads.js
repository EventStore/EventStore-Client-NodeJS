"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("./types");
var grpc = require("grpc");
var streams = require("./generated/streams_pb");
var streams_pb_1 = require("./generated/streams_pb");
var Reads = /** @class */ (function () {
    function Reads() {
    }
    Reads.prototype.readAllForwards = function (position, maxCount, resolveLinksTo, filter, userCredentials) {
        // TODO: Needs to handle filter
        // TODO: Override user credentials
        var metadata = new grpc.Metadata();
        var auth = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
        metadata.set("authorization", auth);
        var readRequestOptions = new streams.ReadReq.Options();
        readRequestOptions.setReadDirection(streams.ReadReq.Options.ReadDirection.FORWARDS);
        readRequestOptions.setResolveLinks(resolveLinksTo);
        var allOptions = new streams.ReadReq.Options.AllOptions();
        if (position.isEnd()) {
            allOptions.setEnd(new streams.ReadReq.Empty);
        }
        else if (position.isStart()) {
            allOptions.setStart(new streams.ReadReq.Empty);
        }
        else {
            var reqPosition = new streams.ReadReq.Options.Position();
            reqPosition.setCommitPosition(position.commitPosition);
            reqPosition.setPreparePosition(position.preparePosition);
            allOptions.setPosition(reqPosition);
        }
        var uuidOption = new streams.ReadReq.Options.UUIDOption();
        uuidOption.setString(new streams_pb_1.ReadReq.Empty);
        readRequestOptions.setUuidOption(uuidOption);
        // TODO: User Agent
        readRequestOptions.setAll(allOptions);
        readRequestOptions.setCount(maxCount);
        readRequestOptions.setNoFilter(new streams.ReadReq.Empty());
        var readRequest = new streams.ReadReq();
        readRequest.setOptions(readRequestOptions);
        var readCall = this.service.read(readRequest, metadata);
        return new Promise(function (resolve, reject) {
            var events = new Array();
            readCall.on("data", function (chunk) {
                var _a;
                var event = Reads.convertToEventRecord((_a = chunk.getEvent()) === null || _a === void 0 ? void 0 : _a.getEvent());
                var resolvedEvent = new types.ResolvedEvent(event, null, null);
                if (event !== null) {
                    events.push(resolvedEvent);
                }
            });
            readCall.on('error', function (e) {
                reject(e);
            });
            readCall.on('end', function () {
                resolve(events);
            });
        });
    };
    Reads.convertToEventRecord = function (event) {
        var _a;
        if (event === undefined) {
            return null;
        }
        var isJson = event.getMetadataMap().get('is-json');
        var eventType = event.getMetadataMap().get('type');
        return new types.EventRecord(event.getStreamName(), (_a = event.getId()) === null || _a === void 0 ? void 0 : _a.getString(), event.getStreamRevision(), eventType, event.getData_asU8(), event.getCustomMetadata_asU8(), new Date(), new types.Position(event.getCommitPosition(), event.getPreparePosition()), isJson == 'True');
    };
    return Reads;
}());
exports.Reads = Reads;
