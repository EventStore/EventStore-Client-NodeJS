/* eslint-disable @typescript-eslint/no-explicit-any */
import { collect, createTestNode, jsonTestEvents } from "@test-utils";
import { AccessDeniedError, EventStoreDBClient } from "@eventstore/db-client";

describe("certificates - with admin user certificate only", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        certChain: node.certs.users.admin.certPath,
        privateKey: node.certs.users.admin.certKeyPath,
      }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("using default only credentials", async () => {
    const STREAM_NAME = "append-only-credentials";

    const result = await client.appendToStream(STREAM_NAME, jsonTestEvents(2));
    expect(result).toBeDefined();

    const events = await collect(client.readStream(STREAM_NAME));
    expect(events.length).toBe(2);
  });

  test("override append call with new user certificate", async () => {
    const STREAM_NAME = "override-read-call-with-admin-user-certificate";

    // Spy on the getGRPCClient and createGRPCClient methods
    const getGRPCClientSpy = jest.spyOn(client as any, "getGRPCClient");
    const createGRPCClientSpy = jest.spyOn(client as any, "createGRPCClient");

    // will create an initial grpc client with channel containing invalid user certificate
    try {
      await client.appendToStream(STREAM_NAME, jsonTestEvents(2), {
        certificate: node.certs.users.invalid,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AccessDeniedError);
    }

    // should create a new grpc client and channel with admin user certificate
    const events = await collect(client.readAll());
    expect(events.length).toBeGreaterThan(0);

    // will use existing grpc client (with admin user certificate) to append events
    const events2 = await collect(client.readAll());
    expect(events2.length).toBeGreaterThan(0);

    expect(getGRPCClientSpy).toHaveBeenCalledTimes(3);
    expect(createGRPCClientSpy).toHaveBeenCalledTimes(2);
    expect(createGRPCClientSpy).toHaveBeenCalledWith(
      expect.any(Function),
      node.certs.users.invalid
    );
    expect(createGRPCClientSpy).toHaveBeenCalledWith(
      expect.any(Function),
      undefined
    );

    getGRPCClientSpy.mockRestore();
    createGRPCClientSpy.mockRestore();
  });

  test("overriden user credentials takes precedence over invalid user certifiate", async () => {
    const STREAM_NAME = "user-creds-precedence-over-invalid";

    try {
      await client.appendToStream(STREAM_NAME, jsonTestEvents(2), {
        credentials: {
          username: "wrong",
          password: "password",
        },
        certificate: {
          certKeyPath: node.certs.users.invalid.certKeyPath,
          certPath: node.certs.users.invalid.certPath,
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AccessDeniedError);
    }
  });

  test("user credentials takes precedence over valid user certificates when call is overriden", async () => {
    const STREAM_NAME = "user-creds-precedence";

    try {
      await client.appendToStream(STREAM_NAME, jsonTestEvents(2), {
        credentials: {
          username: "wrong",
          password: "password",
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AccessDeniedError);
    }
  });

  test("user credentials takes precedence over invalid user certificates when call is overriden", async () => {
    const STREAM_NAME = "user-creds-precedence";

    const invalidClient = new EventStoreDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        certChain: node.certs.users.invalid.certPath,
        privateKey: node.certs.users.invalid.certKeyPath,
      }
    );

    const result = await invalidClient.appendToStream(
      STREAM_NAME,
      jsonTestEvents(2),
      {
        credentials: {
          username: "admin",
          password: "changeit",
        },
      }
    );

    expect(result).toBeDefined();
  });
});
