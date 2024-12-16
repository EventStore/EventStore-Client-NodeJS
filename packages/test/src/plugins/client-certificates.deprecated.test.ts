/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Test constructor with deprecated fields, certChain and privateKey in the client.
 * NOTE: This test should be removed in the next major relase.
 */

import { createTestNode, jsonTestEvents } from "@test-utils";
import {
  AccessDeniedError,
  ChannelCredentialOptions,
  KurrentDBClient,
} from "@kurrent/db-client";

describe("client certificates (with deprecated credential options)", () => {
  const node = createTestNode();

  beforeAll(async () => {
    await node.up();
  });

  afterAll(async () => {
    await node.down();
  });

  describe("show warnings and/or error when constructor is initialised with incorrect channel credentials combinations", () => {
    test.each([
      [
        "certChain only",
        () =>
          new KurrentDBClient(
            { endpoint: node.uri },
            {
              rootCertificate: node.certs.root,
              certChain: node.certs.users.admin.userCertFile,
            }
          ),
      ],
      [
        "privateKey only",
        () =>
          new KurrentDBClient(
            { endpoint: node.uri },
            {
              rootCertificate: node.certs.root,
              privateKey: node.certs.users.admin.userKeyFile,
            }
          ),
      ],
      [
        "both privateKey and certChain",
        () =>
          new KurrentDBClient(
            { endpoint: node.uri },
            {
              rootCertificate: node.certs.root,
              privateKey: node.certs.users.admin.userKeyFile,
              certChain: node.certs.users.admin.userCertFile,
            }
          ),
      ],
    ])("constructor initialised with %s", (_, makeCall) => {
      const warnSpy = jest.spyOn(console, "warn").mockImplementation();
      try {
        makeCall();
      } catch (error) {
        expect(error).toMatchSnapshot();
      }

      expect(warnSpy).toHaveBeenCalled();
      expect(warnSpy.mock.calls).toMatchSnapshot();

      warnSpy.mockRestore();
    });
  });

  describe("client initialized with only the admin certificate", () => {
    let client: KurrentDBClient;

    beforeEach(() => {
      client = new KurrentDBClient(
        { endpoint: node.uri },
        {
          rootCertificate: node.certs.root,
          certChain: node.certs.users.admin.userCertFile,
          privateKey: node.certs.users.admin.userKeyFile,
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
        certChain: node.certs.users.admin.userCertFile,
        privateKey: node.certs.users.admin.userKeyFile,
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
        certChain: node.certs.users.invalid.userCertFile,
        privateKey: node.certs.users.invalid.userKeyFile,
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
