import { createInsecureTestNode } from "../../utils";

import { connectionStringTests } from "./connectionStringTests";

connectionStringTests({
  title: "Insecure Single Node",
  createServer: createInsecureTestNode,
  createUri: ({ uri }) => uri,
  createQueryString: () => `tls=false`,
  streamPrefix: "insecure-single-node",
});
