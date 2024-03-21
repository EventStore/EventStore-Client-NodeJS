import { createTestCluster } from "@test-utils";

import { connectionStringTests } from "./connectionStringTests";

connectionStringTests({
  title: "Secure Cluster",
  createServer: createTestCluster,
  createUri: ({ endpoints }) =>
    endpoints.map(({ address, port }) => `${address}:${port}`).join(","),
  createQueryString: ({ certPath }) => `tlsCAFile=${certPath.root}`,
  streamPrefix: "secure-cluster",
});
