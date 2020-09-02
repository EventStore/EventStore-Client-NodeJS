/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Metadata } from "grpc";
import { Credentials } from "../types";

export class Command {
  private _credentials?: Credentials;
  private _requiresLeader?: boolean = false;

  get metadata(): Metadata {
    const metadata = new Metadata();

    if (this._credentials) {
      const auth = Buffer.from(
        `${this._credentials.username}:${this._credentials.password}`
      ).toString("base64");
      metadata.add("authorization", `Basic ${auth}`);
    }

    if (this._requiresLeader) {
      metadata.add("requires-leader", "true");
    }

    return metadata;
  }

  /**
   * Executes this command as an authenticated user.
   * @param username
   * @param password
   */
  authenticated(username: string, password: string) {
    this._credentials = Credentials(username, password);
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
}
