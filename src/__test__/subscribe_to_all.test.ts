import * as eventstore from "../index";

describe("subscribe to $all", function () {
  it("should successfully subsscribe to $all", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113");

    const promise = new Promise<number>((resolve, reject) => {
      let count = 0;
      connection
        .streams()
        .subscribeToAll()
        .fromStart()
        .authenticated("admin", "changeit")
        .execute({
          onError: reject,
          onEnd: () => {
            resolve(count);
          },
          onEvent: (event) => {
            console.log(JSON.stringify(event, null, 4));
            ++count;
            if (count === 3) {
              resolve(count);
            }
          },
        });
    });

    const result = await promise;
    expect(result).toBe(3);
  });
});
