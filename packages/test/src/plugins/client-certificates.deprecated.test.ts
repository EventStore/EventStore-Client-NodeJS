/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Test constructor with deprecated fields, certChain and privateKey in the client.
 * NOTE: This test should be removed in the next major relase.
 */

import { createTestNode, jsonTestEvents } from "@test-utils";
import {
  AccessDeniedError,
  ChannelCredentialOptions,
  EventStoreDBClient,
} from "@eventstore/db-client";

describe("client certificates (with deprecated credential options)", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("client initialized with only the admin certificate", () => {
    let client: EventStoreDBClient;

    beforeEach(() => {
      client = EventStoreDBClient.connectionString(
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
    const clientWithCredentials = EventStoreDBClient.connectionString(
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

  test("When the client is initialized with invalid certificate, user credentials take precendence if overriden during a call", async () => {
    const clientWithBadCertificate = EventStoreDBClient.connectionString(
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
