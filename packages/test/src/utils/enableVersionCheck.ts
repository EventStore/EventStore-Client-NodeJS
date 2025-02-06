/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
import NodeEnvironment from require("jest-environment-node");

import { Cluster } from "./Cluster";
import { EventStoreDBClient } from "@eventstore/db-client/dist/index";

async function extractVersion(this: EventStoreDBClient) {
  const capabilities = await this.capabilities;
  return capabilities;
}

const checkCapabilities = async () => {
  const node = new Cluster(1);
  await node.up();

  const client = EventStoreDBClient.connectionString(node.connectionString());
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
