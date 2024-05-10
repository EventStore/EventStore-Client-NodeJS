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
      const client = new EventStoreDBClient(
        { endpoints: cluster.endpoints },
        { rootCertificate: cluster.certs.root }
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const client = new EventStoreDBClient(
        {
          endpoints: cluster.endpoints.map(({ address: _, port }) => ({
            address: "127.0.0.1",
            port,
          })),
        },
        { rootCertificate: cluster.certs.root }
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = new EventStoreDBClient(
        { endpoints: cluster.endpoints },
        { rootCertificate: cluster.certs.root }
      );

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
      const client = new EventStoreDBClient(
        { endpoints: cluster.endpoints },
        { insecure: true }
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("ip", async () => {
      const client = new EventStoreDBClient(
        {
          endpoints: cluster.endpoints.map(({ address: _, port }) => ({
            address: "127.0.0.1",
            port,
          })),
        },
        { insecure: true }
      );

      const result = await ping.call(client);
      expect(result).toMatchObject(goodPing);
    });

    test("error transform", async () => {
      const client = new EventStoreDBClient(
        { endpoints: cluster.endpoints },
        { insecure: true }
      );

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
