let assert = require('assert');
import {AnyStreamRevision, ConnectionSettings, EventData, EventStoreConnection} from '../dist';
let uuid = require('uuid/v1');

describe('append_to_stream', function () {
    it('should successfully append events to stream', function () {
        // Connect to client
        let connectionSettings = new ConnectionSettings("/Users/mat-mcloughlin/git/eventStore/src/dev-ca/server1.pem");
        let client = new EventStoreConnection('localhost:2113', 'admin', 'changeit', connectionSettings);

        // Generate event data
        let eventData = new Array<EventData>();

        // Encode JSON
        const encoder = new TextEncoder();
        let data = encoder.encode('{"Id": "1"}');

        let eventId = uuid();
        
        let eventDataOne = new EventData(eventId, "type", data);
        eventData.push(eventDataOne);

        // Send request to append
        client.appendToStream("SomeStream", AnyStreamRevision.Any, eventData);
    });
});
    