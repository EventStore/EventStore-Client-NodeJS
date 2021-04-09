import { Credentials, EndPoint, NodePreference } from "../types";
import { debug } from "../utils";

export interface QueryOptions {
  maxDiscoverAttempts?: number;
  discoveryInterval?: number;
  gossipTimeout?: number;
  nodePreference?: NodePreference;
  tls?: boolean;
  tlsVerifyCert?: boolean;
  tlsCAFile?: string;
  throwOnAppendFailure?: boolean;
  keepAliveInterval?: number;
  keepAliveTimeout?: number;
}

export interface ConnectionOptions extends QueryOptions {
  dnsDiscover: boolean;
  defaultCredentials?: Credentials;
  hosts: EndPoint[];
}

type ParsingLocation = [from: number, to: number];

const notCurrentlySupported = ["tlsVerifyCert"];

const lowerToKey: {
  [K in keyof QueryOptions as Lowercase<K>]: K;
} = {
  maxdiscoverattempts: "maxDiscoverAttempts",
  discoveryinterval: "discoveryInterval",
  gossiptimeout: "gossipTimeout",
  nodepreference: "nodePreference",
  tls: "tls",
  tlsverifycert: "tlsVerifyCert",
  tlscafile: "tlsCAFile",
  throwonappendfailure: "throwOnAppendFailure",
  keepaliveinterval: "keepAliveInterval",
  keepalivetimeout: "keepAliveTimeout",
};

export const parseConnectionString = (
  connectionString: string
): ConnectionOptions =>
  parseProtocol(connectionString.trim().replace(/\/+$/, ""), 0, {
    dnsDiscover: false,
    hosts: [],
  });

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
    const [username, password] = match.groups.credentials.trim().split(":");
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

    const [
      address,
      rawPort = "2113",
      ...rest
    ] = match.groups?.host.trim().split(":");

    if (rest.length) {
      throw new ParseError(
        connectionString,
        [position + `${address}:${rawPort}`.length, nextPosition],
        ", or ?key=value"
      );
    }

    const port = parseInt(rawPort.trim());

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
  { key: rawKey, value: rawValue }: RawKeyPair,
  connectionString: string,
  [from, to]: ParsingLocation
): KeyValuePair | null => {
  const keyFrom = from + `&${rawKey}=`.length;
  const key =
    lowerToKey[rawKey.trim().toLowerCase() as Lowercase<keyof QueryOptions>] ??
    rawKey;
  const value = rawValue.trim();

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
    case "tlsCAFile": {
      return { key, value: value };
    }
    case "maxDiscoverAttempts":
    case "discoveryInterval":
    case "gossipTimeout":
    case "keepAliveInterval":
    case "keepAliveTimeout": {
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
