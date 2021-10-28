import type { ServerFeatures } from "../../Client/ServerFeatures";

declare global {
  // eslint-disable-next-line no-var
  var capabilities: ServerFeatures;
}

const UNKNOWN = "unknown";

interface ServerVersion {
  string: string;
  year: number;
  month: number;
  patch: number;
}

const parseServerVersion = (
  version: string
): ServerVersion | typeof UNKNOWN => {
  const match = version.match(
    /^(?<year>[0-9]+)[.](?<month>[0-9]+)[.](?<patch>[0-9]+)/
  );

  if (!match) return UNKNOWN;

  return {
    string: version,
    year: parseInt(match.groups!.year, 10),
    month: parseInt(match.groups!.month, 10),
    patch: parseInt(match.groups!.patch, 10),
  };
};

const stringToOperator = (op?: string): ((a: number, b: number) => boolean) => {
  switch (op) {
    case ">":
      return (a, b) => a > b;
    case "<":
      return (a, b) => a < b;
    case ">=":
      return (a, b) => a >= b;
    case "<=":
      return (a, b) => a <= b;
    default:
      return (a, b) => a === b;
  }
};

const versionMatches = (
  matchString: string,
  serverVersion: string
): boolean => {
  const match = matchString.match(
    /^(?<operator>>|<|>=|<=)?(?<year>[0-9]+)([.](?<month>[0-9]+))?([.](?<patch>[0-9]+))?/
  );

  if (!match) throw `Malformed version match string ${matchString}`;

  const groups = match.groups as {
    operator?: string;
    year: string;
    month?: string;
    patch?: string;
  };
  const version = parseServerVersion(serverVersion);

  if (version === UNKNOWN) {
    return !!groups.operator?.startsWith("<");
  }

  const operator = stringToOperator(groups.operator);

  if (!operator(parseInt(groups.year, 10), version.year)) {
    return false;
  }

  if (
    groups.month != null &&
    !operator(parseInt(groups.month, 10), version.month)
  ) {
    return false;
  }

  if (
    groups.patch != null &&
    !operator(parseInt(groups.patch, 10), version.patch)
  ) {
    return false;
  }

  return true;
};

export const matchServerVersion = (
  version: TemplateStringsArray,
  ...parts: unknown[]
) => {
  if (!global.capabilities) {
    throw "Capabilities is undefined, ensure that jest-environment is set at top of test file: /** @jest-environment ./src/__test__/utils/enableVersionCheck.ts */";
  }

  const serverVersion = global.capabilities.serverVersion;
  const matchString = version.reduce<string>(
    (acc, chunk, i) => `${acc}${chunk}${parts[i] ?? ""}`,
    ""
  );

  return versionMatches(matchString, serverVersion);
};
