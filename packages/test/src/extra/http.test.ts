import {
  ConnectionFeatures,
  createInsecureTestCluster,
  createTestCluster,
} from "@test-utils";
import { KurrentDBClient } from "@kurrent/kurrentdb-client";

describe("http api", () => {
  interface PingResult {
    msgTypeId: number;
    text: string;
  }
  function ping(this: KurrentDBClient) {
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
      const client = KurrentDBClient.connectionString(
        cluster.connectionString()
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const overrides: ConnectionFeatures = {
        endpoints: cluster.endpoints.map(({ address: _, port }) => ({
          address: "127.0.0.1",
          port,
        })),
      };
      const client = KurrentDBClient.connectionString(
        cluster.connectionStringWithOverrides(overrides)
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = KurrentDBClient.connectionString(
        cluster.connectionString()
      );

      class TestError extends Error {
        public code: number;
        constructor(code: number, message: string) {
          super(message);
          this.code = code;
        }
      }

      function nonsense(this: KurrentDBClient) {
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
      const client = KurrentDBClient.connectionString(
        cluster.connectionString()
      );
      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const overrides: ConnectionFeatures = {
        endpoints: cluster.endpoints.map(({ address: _, port }) => ({
          address: "127.0.0.1",
          port,
        })),
      };
      const client = KurrentDBClient.connectionString(
        cluster.connectionStringWithOverrides(overrides)
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = KurrentDBClient.connectionString(
        cluster.connectionString()
      );

      class TestError extends Error {
        public code: number;
        constructor(code: number, message: string) {
          super(message);
          this.code = code;
        }
      }

      function nonsense(this: KurrentDBClient) {
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
