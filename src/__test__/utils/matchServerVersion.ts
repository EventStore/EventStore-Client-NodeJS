import type { ClientCapabilities } from "../../Client/ClientCapabilities";

declare global {
  // eslint-disable-next-line no-var
  var capabilities: ClientCapabilities;
}

export const matchServerVersion = (
  version: TemplateStringsArray,
  ...parts: unknown[]
) => {
  if (!global.capabilities) {
    throw "Capabilities is undefined, ensure that jest-environment is set at top of test file: /** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */";
  }

  return capabilities.versionMatches(
    version.reduce<string>(
      (acc, chunk, i) => `${acc}${chunk}${parts[i] ?? ""}`,
      ""
    )
  );
};
