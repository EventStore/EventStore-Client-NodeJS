/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTestNode, jsonTestEvents } from "@test-utils";
import { AccessDeniedError, KurrentDBClient } from "@kurrent/db-client";

describe("client certificates", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("throw error when constructor is initialised with incorrect channel credentials combinations", () => {
    test.each([
      [
        "userCertFile",
        () =>
          new KurrentDBClient(
            { endpoint: node.uri },
            {
              rootCertificate: node.certs.root,
              userCertFile: node.certs.users.admin.userCertFile,
            }
          ),
      ],
      [
        "userKeyFile",
        () =>
          new KurrentDBClient(
            { endpoint: node.uri },
            {
              rootCertificate: node.certs.root,
              userKeyFile: node.certs.users.admin.userKeyFile,
            }
          ),
      ],
    ])("constructor initialised with %s only", (_, makeCall) => {
      try {
        makeCall();
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });

    test.each([
      [
        "userCertFile",
        () =>
          KurrentDBClient.connectionString`esdb://${node.uri}?tls=true&tlsCAFile=${node.certPath.root}&userCertFile=${node.certPath.admin.certPath}`,
      ],
      [
        "userKeyFile",
        () =>
          KurrentDBClient.connectionString`esdb://${node.uri}?tls=true&tlsCAFile=${node.certPath.root}&userKeyFile=${node.certPath.admin.certKeyPath}`,
      ],
    ])("connection string with %s only", (_, connection) => {
      try {
        connection();
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });

  describe("client initialized with only the admin certificate", () => {
    let client: KurrentDBClient;

    beforeEach(() => {
      client = new KurrentDBClient(
        { endpoint: node.uri },
        {
          rootCertificate: node.certs.root,
          userCertFile: node.certs.users.admin.userCertFile,
          userKeyFile: node.certs.users.admin.userKeyFile,
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
    const clientWithCredentials = new KurrentDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        userCertFile: node.certs.users.admin.userCertFile,
        userKeyFile: node.certs.users.admin.userKeyFile,
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
    const clientWithBadCertificate = new KurrentDBClient(
      { endpoint: node.uri },
      {
        rootCertificate: node.certs.root,
        userCertFile: node.certs.users.invalid.userCertFile,
        userKeyFile: node.certs.users.invalid.userKeyFile,
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
