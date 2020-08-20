import * as eventstore from "../index";

describe("subscribe to $all", function () {
  it("should successfully subsscribe to $all", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113")
      .streams();

    const promise = new Promise<number>((resolve, reject) => {
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

    const result = await promise;
    connection.close();
    expect(result).toBe(3);
  });
});
