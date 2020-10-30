/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Metadata } from "@grpc/grpc-js";
import { DEFAULT_CREDENTIALS } from "../symbols";
import { Credentials, ESDBConnection } from "../types";

export class Command {
  private _credentials?: Credentials;
  private _requiresLeader?: boolean = false;

  /**
   * Executes this command as an authenticated user.
   * @param credentials
   */
  authenticated({ username, password }: Credentials) {
    this._credentials = { username, password };
    return this;
  }

  /**
   * Executes this command as an authenticated user.
   * @param requiresLeader
   */
  requiresLeader(requiresLeader = true) {
    this._requiresLeader = requiresLeader;
    return this;
  }

  protected metadata = (connection: ESDBConnection): Metadata => {
    const metadata = new Metadata();
    const credentials = this._credentials ?? connection[DEFAULT_CREDENTIALS]();

    if (credentials) {
      const auth = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      metadata.add("authorization", `Basic ${auth}`);
    }

    if (this._requiresLeader) {
      metadata.add("requires-leader", "true");
    }

    return metadata;
  };
}
