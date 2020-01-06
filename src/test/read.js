"use strict";
exports.__esModule = true;
var assert = require('assert');
var dist_1 = require("../dist");
var uuid = require('uuid/v1');
describe('read all forwards', function () {
    it('should successfully read all events', function () {
        // Connect to client
        var connectionSettings = new dist_1.ConnectionSettings("server1.pem");
        var client = new dist_1.EventStoreConnection('localhost:2113', 'admin', 'changeit', connectionSettings);
        client.readAllForwards(dist_1.Position.start, 10, false, new dist_1.Filter(), new dist_1.UserCredentials());
    });
});
