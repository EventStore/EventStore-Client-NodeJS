import { readFile } from "fs/promises";
import { createTestCluster } from "./utils";
import { discoverEndpoint } from "../discovery";
import { ClusterSettings, NodePreference } from "../types";

describe("cluster_discovery", () => {
  const cluster = createTestCluster();

  beforeAll(async () => {
    await cluster.up();
  });

  afterAll(async () => {
    await cluster.down();
  });

  it.each([
    NodePreference.Random,
    NodePreference.Follower,
    NodePreference.Leader,
  ])("should successfully discover a %p endpoint", async (nodePreference) => {
    const clusterSettings: ClusterSettings = {
      gossipSeeds: cluster.seeds,
      nodePreference,
    };

    const cert = await readFile(cluster.certPath);

    const endpoint = await discoverEndpoint(clusterSettings, undefined, cert);

    expect(cluster.endpoints).toEqual(expect.arrayContaining([endpoint]));
  });
});
