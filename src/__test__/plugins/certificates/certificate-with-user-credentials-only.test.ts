/* eslint-disable @typescript-eslint/no-explicit-any */
import { collect, createTestNode, jsonTestEvents } from "@test-utils";
import { EventStoreDBClient, AccessDeniedError } from "@eventstore/db-client";

describe("certificates - with default credentials only", () => {
  const node = createTestNode();
  let client!: EventStoreDBClient;

  beforeAll(async () => {
    await node.up();
    client = new EventStoreDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
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

  test("override read call with admin user certificate", async () => {
    const STREAM_NAME = "append-only-override-with-valid-certificate";

    const result = await client.appendToStream(STREAM_NAME, jsonTestEvents(2));
    expect(result).toBeDefined();

    let events = [];

    try {
      events = await collect(
        client.readStream(STREAM_NAME, {
          certificate: node.certs.users.admin,
        })
      );
    } catch (error) {
      expect(error).not.toBeDefined();
      expect(events?.length).toBe(2);
    }
  });

  test("override read call with invalid user certificate", async () => {
    const STREAM_NAME = "append-only-override-with-valid-certificate";

    const result = await client.appendToStream(STREAM_NAME, jsonTestEvents(2));
    expect(result).toBeDefined();

    let events = [];

    try {
      events = await collect(
        client.readStream(STREAM_NAME, {
          certificate: node.certs.users.invalid,
        })
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AccessDeniedError);
      expect(events.length).toBe(0);
    }
  });

  test("client user credentials takes precedence over provided invalid user certifiate", async () => {
    const STREAM_NAME = "user-creds-precedence-over-invalid";

    const result = await client.appendToStream(STREAM_NAME, jsonTestEvents(2), {
      certificate: {
        certKeyPath: node.certs.users.invalid.certKeyPath,
        certPath: node.certs.users.invalid.certPath,
      },
    });

    expect(result).toBeDefined();
  });

  test("overriden user credentials takes precedence over invalid user certifiate", async () => {
    const STREAM_NAME = "user-creds-precedence-over-invalid";

    const result = await client.appendToStream(STREAM_NAME, jsonTestEvents(2), {
      credentials: {
        username: "admin",
        password: "changeit",
      },
      certificate: {
        certKeyPath: node.certs.users.invalid.certKeyPath,
        certPath: node.certs.users.invalid.certPath,
      },
    });

    expect(result).toBeDefined();
  });

  test("overriding two consecutive calls with admin user certificate", async () => {
    const STREAM_NAME = "user-creds-precedence-over-invalid";

    const getGRPCClientSpy = jest.spyOn(client as any, "getGRPCClient");
    const createGRPCClientSpy = jest.spyOn(client as any, "createGRPCClient");

    const result1 = await client.appendToStream(
      STREAM_NAME,
      jsonTestEvents(2),
      {
        certificate: {
          certKeyPath: node.certs.users.admin.certKeyPath,
          certPath: node.certs.users.admin.certPath,
        },
      }
    );

    expect(result1).toBeDefined();

    // this should use the same grpc client and channel as the previous call
    const result2 = await client.appendToStream(
      STREAM_NAME,
      jsonTestEvents(2),
      {
        certificate: {
          certKeyPath: node.certs.users.admin.certKeyPath,
          certPath: node.certs.users.admin.certPath,
        },
      }
    );

    expect(result2).toBeDefined();

    expect(getGRPCClientSpy).toHaveBeenCalledTimes(2);
    expect(createGRPCClientSpy).toHaveBeenCalledTimes(1);
    expect(createGRPCClientSpy).toHaveBeenCalledWith(expect.any(Function), {
      certKeyPath: node.certs.users.admin.certKeyPath,
      certPath: node.certs.users.admin.certPath,
    });

    getGRPCClientSpy.mockRestore();
    createGRPCClientSpy.mockRestore();
  });
});
