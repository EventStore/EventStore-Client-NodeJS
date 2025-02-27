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

  describe("client initialized with only the admin certificate", () => {
    let client: KurrentDBClient;

    beforeEach(() => {
      client = KurrentDBClient.connectionString(
        node.connectionStringWithOverrides({
          userCertificates: "valid",
        })
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
    const clientWithCredentials = KurrentDBClient.connectionString(
      node.connectionStringWithOverrides({
        userCertificates: "valid",
        defaultUserCredentials: { username: "wrong", password: "password" },
      })
    );

    await expect(
      clientWithCredentials.appendToStream(
        "user_credentials_takes_precedence_over_client_certificate",
        jsonTestEvents(2)
      )
    ).rejects.toThrow(AccessDeniedError);
  });

  test("When the client is initialized with invalid certificate, user credentials take precedence if overridden during a call", async () => {
    const clientWithBadCertificate = KurrentDBClient.connectionString(
      node.connectionStringWithOverrides({
        userCertificates: "invalid",
      })
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
