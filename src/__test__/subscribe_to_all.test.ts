import { createTestNode } from "./utils";
import { EventStoreConnection } from "../index";

describe("subscribe to $all", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  it("should successfully subsscribe to $all", async () => {
    const connection = EventStoreConnection.builder()
      .sslRootCertificate(node.certPath)
      .singleNodeConnection(node.uri)
      .streams();

    const result = await new Promise<number>((resolve, reject) => {
      let count = 0;
      connection
        .subscribeToAll()
        .fromStart()
        .authenticated("admin", "changeit")
        .execute({
          onError: reject,
          onEnd: () => {
            resolve(count);
          },
          onEvent: (report) => {
            ++count;
            if (count === 3) {
              report.unsubcribe();
              resolve(count);
            }
          },
        });
    });

    connection.close();
    expect(result).toBe(3);
  });
});
