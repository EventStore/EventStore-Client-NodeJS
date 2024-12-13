[1mdiff --git a/packages/test/src/utils/Cluster.ts b/packages/test/src/utils/Cluster.ts[m
[1mindex 089879b..5edfb50 100644[m
[1m--- a/packages/test/src/utils/Cluster.ts[m
[1m+++ b/packages/test/src/utils/Cluster.ts[m
[36m@@ -11,6 +11,7 @@[m [mimport type { EndPoint, Certificate } from "@eventstore/db-client";[m
 [m
 import { testDebug } from "./debug";[m
 import { dockerImages } from "./dockerImages";[m
[32m+[m[32mimport {kill} from "docker-compose";[m
 [m
 const rmdir = promisify(fs.rm);[m
 const mkdir = promisify(fs.mkdir);[m
[36m@@ -298,7 +299,10 @@[m [mexport class Cluster {[m
 [m
   public killNode = async (node: EndPoint): Promise<void> => {[m
     const nodeId = this.endpointToNodeId(node);[m
[31m-    const response = await stopOne(nodeId, {[m
[32m+[m[32m    // const response = await stopOne(nodeId, {[m
[32m+[m[32m    //   cwd: this.path(),[m
[32m+[m[32m    // });[m
[32m+[m[32m    const response = await kill({[m
       cwd: this.path(),[m
     });[m
 [m
