"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreConnection = exports.EventStoreConnectionBuilder = exports.Credentials = void 0;
var grpc = require("grpc");
var Credentials = /** @class */ (function () {
    function Credentials(username, password) {
        this.username = username;
        this.password = password;
    }
    return Credentials;
}());
exports.Credentials = Credentials;
var EventStoreConnectionBuilder = /** @class */ (function () {
    function EventStoreConnectionBuilder() {
        this.credentials = null;
    }
    EventStoreConnectionBuilder.prototype.authenticated = function (credentials) {
        this.credentials = credentials;
        return this;
    };
    EventStoreConnectionBuilder.prototype.build = function (uri) {
        return new EventStoreConnection(uri);
    };
    return EventStoreConnectionBuilder;
}());
exports.EventStoreConnectionBuilder = EventStoreConnectionBuilder;
var EventStoreConnection = /** @class */ (function () {
    // protected service: streamsService.StreamsClient;
    //
    // appendToStream = Appends.prototype.appendToStream;
    //
    // readAllForwards = Reads.prototype.readAllForwards;
    function EventStoreConnection(uri) {
        this._uri = uri;
        var credentials = grpc.credentials.createInsecure();
        // if (connectionSettings !== null) {
        //     if (connectionSettings.sslCertificate !== null) {
        //         let cert = fs.readFileSync(connectionSettings.sslCertificate);
        //         credentials = grpc.credentials.createSsl(cert);
        //     }
        // }
        //this.service = new streamsService.StreamsClient("localhost:2113", credentials);
    }
    EventStoreConnection.builder = function () {
        return new EventStoreConnectionBuilder();
    };
    EventStoreConnection.prototype.streams = function () {
        null;
    };
    return EventStoreConnection;
}());
exports.EventStoreConnection = EventStoreConnection;
