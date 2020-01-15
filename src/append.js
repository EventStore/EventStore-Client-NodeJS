"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var streams = require("./generated/streams_pb");
var Appends = /** @class */ (function () {
    function Appends() {
    }
    Appends.prototype.appendToStream = function (streamName, expectedRevision, eventData, userCredentials) {
        var username = this.username;
        var password = this.password;
        if (userCredentials != undefined) {
            username = userCredentials.username;
            password = userCredentials.password;
        }
        var metadata = new grpc.Metadata();
        var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        metadata.set("authorization", auth);
        var appendCall = this.service.append(metadata, function (error) {
            console.log(error);
        });
        appendCall.on("error", function (err) {
            // TODO: HANDLE ERROR
        });
        var appendRequestOptions = new streams.AppendReq.Options();
        appendRequestOptions.setStreamName(streamName);
        appendRequestOptions.setAny(new streams.AppendReq.Empty());
        appendRequestOptions.clearRevision();
        var header = new streams.AppendReq();
        header.setOptions(appendRequestOptions);
        // CONSIDER LOGGING LEVELS
        appendCall.write(header);
        eventData.forEach(function (value) {
            var id = new streams.UUID();
            id.setString(value.eventId);
            var proposedMessage = new streams.AppendReq.ProposedMessage();
            proposedMessage.setId(id);
            proposedMessage.setData(value.data);
            proposedMessage.getMetadataMap().set("is-json", value.isJson.toString());
            proposedMessage.getMetadataMap().set("type", value.type);
            var event = new streams.AppendReq();
            event.setProposedMessage(proposedMessage);
            appendCall.write(event);
        });
        appendCall.end();
    };
    return Appends;
}());
exports.Appends = Appends;
