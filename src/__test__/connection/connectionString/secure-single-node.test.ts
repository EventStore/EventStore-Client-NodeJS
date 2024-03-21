import { createTestNode } from "@test-utils";

import { connectionStringTests } from "./connectionStringTests";

connectionStringTests({
  title: "Secure Single Node",
  createServer: createTestNode,
  createUri: ({ uri }) => uri,
  createQueryString: ({ certPath }) => `tlsCAFile=${certPath.root}`,
  streamPrefix: "secure-single-node",
});
