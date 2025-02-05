import { createInsecureTestCluster, createTestCluster } from "@test-utils";
import { EventStoreDBClient } from "@eventstore/db-client";

describe("http api", () => {
  interface PingResult {
    msgTypeId: number;
    text: string;
  }

  function ping(this: EventStoreDBClient) {
    return this.HTTPRequest<PingResult>("GET", "/ping", {});
  }

  const goodPing = {
    msgTypeId: expect.any(Number),
    text: "Ping request successfully handled",
  };

  describe("secure", () => {
    const cluster = createTestCluster();

    beforeAll(async () => {
      await cluster.up();
    });

    afterAll(async () => {
      await cluster.down();
    });

    test("dns", async () => {
      const client = EventStoreDBClient.connectionString`esdb://${cluster.uri}?tlsCaFile=${cluster.certPath.root}`;

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const endpoint = cluster.endpoints
        .map((endpoint) => `127.0.0.1:${endpoint.port}`)
        .join(",");
      const client = EventStoreDBClient.connectionString`esdb://${endpoint}?tlsCaFile=${cluster.certPath.root}`;

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = EventStoreDBClient.connectionString`esdb://${cluster.uri}?tlsCaFile=${cluster.certPath.root}`;

      class TestError extends Error {
        public code: number;

        constructor(code: number, message: string) {
          super(message);
          this.code = code;
        }
      }

      function nonsense(this: EventStoreDBClient) {
        return this.HTTPRequest<PingResult>("POST", "/asdpoijsad", {
          transformError: (statusCode, statusMessage) => {
            if (statusCode === 404) {
              return new TestError(statusCode, statusMessage);
            }
          },
        });
      }

      try {
        const response = await nonsense.call(client);
        expect(response).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(TestError);
        expect(error).toMatchInlineSnapshot(`[Error: Not Found]`);
      }
    });
  });

  describe("insecure", () => {
    const cluster = createInsecureTestCluster();

    beforeAll(async () => {
      await cluster.up();
    });

    afterAll(async () => {
      await cluster.down();
    });

    test("dns", async () => {
      const client = EventStoreDBClient.connectionString`esdb://${cluster.uri}?tls=false`;

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const endpoint = cluster.endpoints
        .map((endpoint) => `127.0.0.1:${endpoint.port}`)
        .join(",");
      const client = EventStoreDBClient.connectionString`esdb://${endpoint}?tls=false`;

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = EventStoreDBClient.connectionString`esdb://${cluster.uri}?tls=false`;

      class TestError extends Error {
        public code: number;

        constructor(code: number, message: string) {
          super(message);
          this.code = code;
        }
      }

      function nonsense(this: EventStoreDBClient) {
        return this.HTTPRequest<PingResult>("POST", "/asdpoijsad", {
          transformError: (statusCode, statusMessage) => {
            if (statusCode === 404) {
              return new TestError(statusCode, statusMessage);
            }
          },
        });
      }

      try {
        const response = await nonsense.call(client);
        expect(response).toBe("unreachable");
      } catch (error) {
        expect(error).toBeInstanceOf(TestError);
        expect(error).toMatchInlineSnapshot(`[Error: Not Found]`);
      }
    });
  });
});
