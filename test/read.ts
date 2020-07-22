// import {
//     EventData,
//     EventStoreConnection,
//     StreamRevision,
//     ConnectionSettings,
//     Position,
//     Filter,
//     UserCredentials, ResolvedEvent
// } from '../index';
//
// let uuid = require('uuid/v1');
//
// describe('read all forwards', function () {
//     it('should successfully read all events', function () {
//         // Connect to client
//         let connectionSettings = new ConnectionSettings("src/server1.pem");
//         let client = new EventStoreConnection('localhost:2113', 'admin', 'changeit', connectionSettings);
//
//         client.readAllForwards(Position.start, 10, false, new Filter()).then((value : ResolvedEvent[]) => {
//             let events = value as ResolvedEvent[];
//             for (let i = 0; i < events.length; i++) {
//              //   console.log(events[i]);
//                 console.log(events[i].originalStreamId + ' (' + events[i].originalEventNumber + ') - ' + events[i].event.eventId);
//             }
//         });
//     });
// });
//
//