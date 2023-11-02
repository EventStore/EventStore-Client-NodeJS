import type { ServerFeatures } from "../../Client/ServerFeatures";

declare global {
  // eslint-disable-next-line no-var
  var capabilities: ServerFeatures;
}

interface ServerVersion {
  string: string;
  year: number;
  month: number;
  patch: number;
}

export const parseServerVersion = (version: string): ServerVersion => {
  const match = version.match(
    /^(?<year>[0-9]+)[.](?<month>[0-9]+)[.](?<patch>[0-9]+)/,
  );

  if (!match || !match.groups) {
    // version before capabilities were added
    return {
      string: "20.10.0",
      year: 20,
      month: 10,
      patch: 0,
    };
  }

  return {
    string: version,
    year: parseInt(match.groups.year, 10),
    month: parseInt(match.groups.month, 10),
    patch: parseInt(match.groups.patch, 10),
  };
};

interface MatchVersion {
  operator: "===" | ">=" | "<=";
  year: number;
  month?: number;
  patch?: number;
}

const parseMatchVersion = (matchString: string): MatchVersion => {
  const match = matchString.match(
    /^(?<operator>>=|<=)?(?<year>[0-9]+)([.](?<month>[0-9]+))?([.](?<patch>[0-9]+))?/,
  );

  if (!match) throw `Malformed version match string ${matchString}`;

  const groups = match.groups as {
    operator?: string;
    year: string;
    month?: string;
    patch?: string;
  };

  if (!match || !match.groups) {
    throw `Malformed version match string ${matchString}`;
  }

  return {
    operator: (match.groups.operator as MatchVersion["operator"]) ?? "===",
    year: parseInt(match.groups.year, 10),
    month: match.groups.month ? parseInt(match.groups.month, 10) : undefined,
    patch: match.groups.patch ? parseInt(match.groups.patch, 10) : undefined,
  };
};

const versionMatches = (
  matchString: string,
  serverVersion: string,
): boolean => {
  const match = parseMatchVersion(matchString);
  const version = parseServerVersion(serverVersion);

  if (match.operator === ">=") {
    if (version.year > match.year) return true;
    if (version.year < match.year) return false;
    if (match.month && version.month > match.month) return true;
    if (match.month && version.month < match.month) return false;
    if (match.patch && version.patch > match.patch) return true;
    if (match.patch && version.patch < match.patch) return false;
    return true;
  }

  if (match.operator === "<=") {
    if (version.year < match.year) return true;
    if (version.year > match.year) return false;
    if (match.month && version.month < match.month) return true;
    if (match.month && version.month > match.month) return false;
    if (match.patch && version.patch < match.patch) return true;
    if (match.patch && version.patch > match.patch) return false;
    return true;
  }

  if (version.year !== match.year) return false;
  if (match.month && version.month !== match.month) return false;
  if (match.patch && version.patch !== match.patch) return false;
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
    "",
  );

  return versionMatches(matchString, serverVersion);
};
