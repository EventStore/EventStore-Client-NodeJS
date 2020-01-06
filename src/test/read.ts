let assert = require('assert');
import {
    EventData,
    EventStoreConnection,
    StreamRevision,
    ConnectionSettings,
    Position,
    Filter,
    UserCredentials
} from '../dist';
let uuid = require('uuid/v1');

describe('read all forwards', function () {
    it('should successfully read all events', function () {
        // Connect to client
        let connectionSettings = new ConnectionSettings("server1.pem");
        let client = new EventStoreConnection('localhost:2113', 'admin', 'changeit', connectionSettings);

        client.readAllForwards(Position.start, 10, false, new Filter(), new UserCredentials())
    });
});

    