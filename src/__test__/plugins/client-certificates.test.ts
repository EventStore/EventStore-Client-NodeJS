/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTestNode, jsonTestEvents } from "@test-utils";
import { AccessDeniedError, EventStoreDBClient } from "@eventstore/db-client";

describe("client certificates", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("show error if only one of the certificate is provided", () => {
    test("using constructor", async () => {
      try {
        new EventStoreDBClient(
          { endpoint: node.uri },
          {
            rootCertificate: node.certs.root,
            certFile: node.certs.users.admin.certFile,
          }
        );
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: Certificate chain must be given with accompanying private key]`
        );
      }
    });

    test("using connection string", async () => {
      try {
        EventStoreDBClient.connectionString`esdb://${node.uri}?tls=true&tlsCAFile=${node.certPath.root}&certFile=${node.certPath.admin.certPath}`;
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: Both certPath and certKeyPath must be provided together]`
        );
      }
    });
  });

  describe("client initialized with only the admin certificate", () => {
    let client: EventStoreDBClient;

    beforeEach(() => {
      client = new EventStoreDBClient(
        { endpoint: node.uri },
        {
          rootCertificate: node.certs.root,
          certFile: node.certs.users.admin.certFile,
          certKeyFile: node.certs.users.admin.certKeyFile,
        }
      );
    });

    test("using default only certificates", async () => {
      const result = await client.appendToStream(
        "using_default_only_certificates",
        jsonTestEvents(2)
      );
      expect(result).toBeDefined();
    });

    test("overridden user credentials takes precedence over invalid user certificate", async () => {
      await expect(
        client.appendToStream(
          "overridden_user_credentials_takes_precedence",
          jsonTestEvents(2),
          {
            credentials: {
              username: "wrong",
              password: "password",
            },
          }
        )
      ).rejects.toThrow(AccessDeniedError);
    });
  });

  test("user credentials takes precedence over the client certificate during initialization", async () => {
    const clientWithCredentials = new EventStoreDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        certFile: node.certs.users.admin.certFile,
        certKeyFile: node.certs.users.admin.certKeyFile,
      },
      {
        username: "wrong",
        password: "password",
      }
    );

    await expect(
      clientWithCredentials.appendToStream(
        "user_credentials_takes_precedence_over_client_certificate",
        jsonTestEvents(2)
      )
    ).rejects.toThrow(AccessDeniedError);
  });

  test("When the client is initialized with invalid certificate, user credentials take precendence if overriden during a call", async () => {
    const clientWithBadCertificate = new EventStoreDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        certFile: node.certs.users.invalid.certFile,
        certKeyFile: node.certs.users.invalid.certKeyFile,
      }
    );

    expect(
      await clientWithBadCertificate.appendToStream(
        "user_credentials_takes_precedence_over_client_certificate",
        jsonTestEvents(2),
        {
          credentials: {
            username: "admin",
            password: "changeit",
          },
        }
      )
    ).toBeDefined();
  });
});
