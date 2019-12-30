"use strict";
exports.__esModule = true;
var assert = require('assert');
var dist_1 = require("../dist");
var uuid = require('uuid/v1');
describe('append_to_stream', function () {
    it('should successfully append events to stream', function () {
        var connectionSettings = new dist_1.ConnectionSettings("/Users/mat-mcloughlin/git/eventStore/src/dev-ca/server1.pem");
        var client = new dist_1.EventStoreConnection('localhost:2113', 'admin', 'changeit', connectionSettings);
        var eventData = new Array();
        var encoder = new TextEncoder();
        var data = encoder.encode('{"Id": "1"}');
        var eventId = uuid();
        var eventDataOne = new dist_1.EventData(eventId, "type", new Uint8Array(data));
        eventData.push(eventDataOne);
        client.appendToStream("SomeStream", dist_1.StreamRevision.Any, eventData);
    });
});
