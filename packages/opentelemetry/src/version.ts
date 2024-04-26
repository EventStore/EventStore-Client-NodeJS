/* eslint-disable @typescript-eslint/no-var-requires */
const { name: INSTRUMENTATION_NAME, version: INSTRUMENTATION_VERSION } =
  require("../package.json") as {
    name: string;
    version: string;
  };

export { INSTRUMENTATION_NAME, INSTRUMENTATION_VERSION };
