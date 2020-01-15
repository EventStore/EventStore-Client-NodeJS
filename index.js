"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var streamsService = require("./src/generated/streams_grpc_pb");
var grpc = require("grpc");
var append_1 = require("./src/append");
var reads_1 = require("./src/reads");
var EventStoreConnection = /** @class */ (function () {
    function EventStoreConnection(uri, username, password, connectionSettings) {
        this.appendToStream = append_1.Appends.prototype.appendToStream;
        this.readAllForwards = reads_1.Reads.prototype.readAllForwards;
        this._uri = uri;
        this.username = username;
        this.password = password;
        this._connectionSettings = connectionSettings;
        var credentials = grpc.credentials.createInsecure();
        if (connectionSettings !== null) {
            if (connectionSettings.sslCertificate !== null) {
                var cert = fs.readFileSync(connectionSettings.sslCertificate);
                credentials = grpc.credentials.createSsl(cert);
            }
        }
        this.service = new streamsService.StreamsClient("localhost:2113", credentials);
    }
    return EventStoreConnection;
}());
exports.EventStoreConnection = EventStoreConnection;
__export(require("./src/types"));
