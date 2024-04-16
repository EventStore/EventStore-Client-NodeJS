import { createInsecureTestCluster } from "@test-utils";

import { connectionStringTests } from "./connectionStringTests";

connectionStringTests({
  title: "Insecure Cluster",
  createServer: createInsecureTestCluster,
  createUri: ({ endpoints }) =>
    endpoints.map(({ address, port }) => `${address}:${port}`).join(","),
  createQueryString: () => `tls=false`,
  streamPrefix: "insecure-cluster",
});
