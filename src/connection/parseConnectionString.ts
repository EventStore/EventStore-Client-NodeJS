import { Credentials, EndPoint, NodePreference } from "../types";
import { debug } from "../utils/debug";

const notCurrentlySupported = [
  "maxDiscoverAttempts",
  "discoveryInterval",
  "gossipTimeout",
  "tlsVerifyCert",
  "throwOnAppendFailure",
];

export interface ConnectionOptions {
  dnsDiscover: boolean;
  maxDiscoverAttempts: number;
  discoveryInterval: number;
  gossipTimeout: number;
  nodePreference: NodePreference;
  tls: boolean;
  tlsVerifyCert: boolean;
  throwOnAppendFailure: boolean;
  defaultCredentials?: Credentials;
  hosts: EndPoint[];
}

const defaultConnectionOptions: ConnectionOptions = {
  dnsDiscover: false,
  maxDiscoverAttempts: 3,
  discoveryInterval: 500,
  gossipTimeout: 3000,
  nodePreference: "random",
  tls: true,
  tlsVerifyCert: true,
  throwOnAppendFailure: true,
  hosts: [],
};

type ParsingLocation = [from: number, to: number];

export const parseConnectionString = (
  connectionString: string
): ConnectionOptions => {
  const options = Object.assign({}, defaultConnectionOptions);
  return parseProtocol(connectionString.trim().replace(/\/+$/, ""), 0, options);
};

const parseProtocol = (
  connectionString: string,
  position: number,
  options: ConnectionOptions
): ConnectionOptions => {
  let nextPosition = position;
  const expected = "esdb:// or esdb+discover://";
  const match = connectionString
    .substring(position)
    .match(/^(?<protocol>[^:]+):\/\//);

  if (match && match.groups?.protocol) {
    nextPosition += match[0].length;

    switch (match.groups.protocol) {
      case "esdb": {
        return parseCredentials(connectionString, nextPosition, {
          ...options,
          dnsDiscover: false,
        });
      }
      case "esdb+discover": {
        return parseCredentials(connectionString, nextPosition, {
          ...options,
          dnsDiscover: true,
        });
      }
    }
  }

  throw new ParseError(connectionString, [position, nextPosition], expected);
};

const parseCredentials = (
  connectionString: string,
  position: number,
  options: ConnectionOptions
): ConnectionOptions => {
  let nextPosition = position;
  const expected = "username:password";
  const match = connectionString
    .substring(position)
    .match(/^(?:(?<credentials>[^:]+:[^@]+)@)/);

  // This is optional
  if (!match) {
    return parseHosts(connectionString, nextPosition, options, true);
  }

  if (match.groups?.credentials) {
    nextPosition += match[0].length;
    const [username, password] = match.groups.credentials.split(":");
    return parseHosts(
      connectionString,
      nextPosition,
      {
        ...options,
        defaultCredentials: {
          username: decodeURIComponent(username),
          password: decodeURIComponent(password),
        },
      },
      true
    );
  }

  throw new ParseError(connectionString, [position, nextPosition], expected);
};

const parseHosts = (
  connectionString: string,
  position: number,
  options: ConnectionOptions,
  mustMatch: boolean
): ConnectionOptions => {
  let nextPosition = position;
  const expected = "host";
  const match = connectionString
    .substring(position)
    .match(/^(?:(?<host>[^$+!?*'(),;[\]{}|"%~#<>=&]+)[,/]?)/);

  if (!match && mustMatch) {
    throw new ParseError(connectionString, [position, nextPosition], expected);
  }

  if (match && match.groups?.host) {
    nextPosition += match[0].length;

    const [address, rawPort = "2113", ...rest] = match.groups?.host.split(":");

    if (rest.length) {
      throw new ParseError(
        connectionString,
        [position + `${address}:${rawPort}`.length, nextPosition],
        ", or ?key=value"
      );
    }

    const port = parseInt(rawPort);

    if (Number.isNaN(port)) {
      throw new ParseError(
        connectionString,
        [position + `${address}:`.length, nextPosition],
        "port number"
      );
    }

    return parseHosts(
      connectionString,
      nextPosition,
      {
        ...options,
        hosts: [...options.hosts, { address, port }],
      },
      false
    );
  }

  return parseSearchParams(connectionString, nextPosition, options, true);
};

const parseSearchParams = (
  connectionString: string,
  position: number,
  options: ConnectionOptions,
  first: boolean
): ConnectionOptions => {
  if (position === connectionString.length) return options;

  let nextPosition = position;
  const expected = `${first ? "?" : "&"}key=value`;
  const match = connectionString
    .substring(position)
    .match(
      new RegExp(`^(?:[${first ? "?" : "&"}](?<key>[^=]+)=(?<value>[^&?]+))`)
    );

  if (!match || !match.groups || !match.groups.key || !match.groups.value) {
    throw new ParseError(connectionString, [position, nextPosition], expected);
  }

  nextPosition += match[0].length;

  const keypair = verifyKeyValuePair(
    match.groups as RawKeyPair,
    connectionString,
    [position, nextPosition]
  );

  return parseSearchParams(
    connectionString,
    nextPosition,
    keypair
      ? {
          ...options,
          [keypair.key]: keypair.value,
        }
      : options,
    false
  );
};

interface RawKeyPair {
  key: string;
  value: string;
  [key: string]: string;
}

interface KeyValuePair {
  key: string;
  value: unknown;
}

const verifyKeyValuePair = (
  { key, value }: RawKeyPair,
  connectionString: string,
  [from, to]: ParsingLocation
): KeyValuePair | null => {
  const keyFrom = from + `&${key}=`.length;

  if (notCurrentlySupported.includes(key)) {
    debug.connection(
      `${key} is not currently supported by this client, and will have no effect.`
    );
  }

  switch (key) {
    case "nodePreference": {
      const expected: NodePreference[] = ["follower", "leader", "random"];

      if (!expected.includes(value as NodePreference)) {
        throw new ParseError(
          connectionString,
          [keyFrom, to],
          expected.join(" or ")
        );
      }

      return { key, value };
    }
    case "maxDiscoverAttempts":
    case "discoveryInterval":
    case "gossipTimeout": {
      const parsedValue = parseInt(value);

      if (Number.isNaN(parsedValue)) {
        throw new ParseError(connectionString, [keyFrom, to], "Integer");
      }

      return { key, value: parsedValue };
    }
    case "dnsDiscover":
    case "tls":
    case "tlsVerifyCert":
    case "throwOnAppendFailure": {
      if (value !== "true" && value !== "false") {
        throw new ParseError(connectionString, [keyFrom, to], "true or false");
      }

      return { key, value: value === "true" };
    }
  }

  console.warn(
    [
      `Unknown option key "${key}", setting will be ignored.`,
      errorLocationString(connectionString, [
        from + `&`.length,
        from + `&${key}`.length,
      ]),
    ].join("\n")
  );

  return null;
};

const errorString = (
  connectionString: string,
  [from, to]: ParsingLocation,
  expected: string,
  full: boolean
): string => {
  const lines = [];

  lines.push(
    `Unexpected "${connectionString.substring(
      from,
      from === to ? from + 1 : to
    )}" at position ${from}, expected ${expected}.`
  );

  if (full) {
    lines.push(errorLocationString(connectionString, [from, to]));
  }

  return lines.join("\n");
};

const errorLocationString = (
  connectionString: string,
  [from, to]: ParsingLocation
): string => {
  const lines = [];

  lines.push(connectionString);
  lines.push(`${" ".repeat(from)}${"^".repeat(Math.max(to - from, 1))}`);

  return lines.join("\n");
};

class ParseError extends Error {
  public connectionString: string;
  public location: ParsingLocation;
  public expected: string;

  constructor(
    connectionString: string,
    location: ParsingLocation,
    expected: string
  ) {
    super(errorString(connectionString, location, expected, false));
    this.connectionString = connectionString;
    this.location = location;
    this.expected = expected;
    debug.connection(errorString(connectionString, location, expected, true));
  }
}
