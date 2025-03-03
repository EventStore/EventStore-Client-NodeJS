/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import NodeEnvironment from "jest-environment-node";

import { Cluster } from "./Cluster";
import { KurrentDBClient } from "@kurrent/kurrentdb-client/dist/index";

async function extractVersion(this: KurrentDBClient) {
  return await this.capabilities;
}

const checkCapabilities = async () => {
  const node = new Cluster(1);
  await node.up();

  const client = KurrentDBClient.connectionString(node.connectionString());

  const capabilities = await extractVersion.call(client);

  await node.down();

  return capabilities;
};

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    // @ts-ignore
    this.global.capabilities = await checkCapabilities();
  }
}

module.exports = CustomEnvironment;
