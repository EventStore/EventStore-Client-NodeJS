import { v4 as uuid } from "uuid";
import { createTestCluster } from "./utils";
import { EventStoreConnection, EventData, Revision } from "../";

// describe("append_to_stream (single Node)", () => {
//   const node = createTestNode();

//   beforeAll(async () => {
//     await node.up();
//   });

//   afterAll(async () => {
//     await node.down();
//   });

//   it("should successfully append events to stream", async () => {
//     const connection = EventStoreConnection.builder()
//       .sslRootCertificate(node.certPath)
//       .singleNodeConnection(node.uri);

//     const streamName = `write-${uuid()}`;
//     const evt = EventData.json("typescript-type", {
//       message: "baz",
//     }).build();

//     const result = await connection
//       .streams()
//       .writeEvents(streamName)
//       .expectedRevision(Revision.Any)
//       .send([evt]);

//     expect(result.__typename).toBe("success");
//   });
// });

describe("append_to_stream (cluster)", () => {
  const cluster = createTestCluster();

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  it("should successfully append events to stream", async () => {
    const connection = await EventStoreConnection.builder()
      .sslRootCertificate(cluster.certPath)
      .gossipClusterConnection(cluster.endpoints);

    const connection = await EventStoreConnection.builder()
      .sslRootCertificate(cluster.certPath)
      .singleNodeConnection("something");

    console.log(connection);

    const streamName = `write-${uuid()}`;
    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    try {
      const command1 = await eventstore
        .streams()
        .writeEvents(streamName)
        .expectedRevision(Revision.Any)
        .send(evt, evt, evt, evt);

      const result1 = command1.run(connection);

      const result1 = command2.run(connection);

      const connection2 = await connection.reconnect();

      const result1 = command1.run(connect);

      // some other stuff
      const result2 = command1.send(["d", "e", "f"], connection);

      // some other stuff
      const result3 = command1.send(["g", "h", "i"], connection);

      const result = connection.execute(command);

      expect(result.__typename).toBe("success");
    } catch (error) {
      error.newEndpoint;

      const connection = connection.closeAndReconnect(error.newEndpoint);
    }
  });
});

meta: grpc.Metadata;
meta.add("requires-leader", "true");
