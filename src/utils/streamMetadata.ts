import { END, START, SYSTEM_STREAM_ACL, USER_STREAM_ACL } from "../constants";

const MAX_AGE = "$maxAge";
const MAX_COUNT = "$maxCount";
const TRUNCATE_BEFORE = "$tb";
const CACHE_CONTROL = "$cacheControl";

const ACL = "$acl";
const ACL_READ = "$r";
const ACL_WRITE = "$w";
const ACL_DELETE = "$d";
const ACL_META_READ = "$mr";
const ACL_META_WRITE = "$mw";

/**
 * Represents an access control list for a stream.
 */
export interface StreamACL {
  /**
   * Roles and users permitted to read the stream.
   */
  readRoles?: string[];

  /**
   * Roles and users permitted to write to the stream.
   */
  writeRoles?: string[];

  /**
   * Roles and users permitted to delete the stream.
   */
  deleteRoles?: string[];

  /**
   * Roles and users permitted to read stream metadata.
   */
  metaReadRoles?: string[];

  /**
   * Roles and users permitted to write stream metadata.
   */
  metaWriteRoles?: string[];
}

export interface SystemStreamMetadata {
  /**
   * The optional maximum age (in seconds) of events allowed in the stream.
   */
  maxAge?: number;

  /**
   * The optional streamPositon from which previous events can be scavenged.
   * This is used to implement soft-deletion of streams.
   */
  truncateBefore?: typeof START | typeof END | number;

  /**
   * The optional amount of time (in seconds) for which the stream head is cacheable.
   */
  cacheControl?: number;

  /**
   * The optional ACL for the stream.
   */
  acl?: typeof USER_STREAM_ACL | typeof SYSTEM_STREAM_ACL | StreamACL;

  /**
   * The optional maximum number of events allowed in the stream.
   */
  maxCount?: number;
}

export type CustomStreamMetadata = Record<string | number, unknown>;

export type StreamMetadata<
  CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
> = SystemStreamMetadata & CustomMetadata;

const convertAcl = (keyLookup: Record<string, string>) => (
  acl: unknown
): unknown => {
  if (typeof acl === "string") return acl;
  return Object.entries(acl as Record<string, unknown>).reduce(
    (acc, [key, value]) => {
      if (keyLookup[key]) return { ...acc, [keyLookup[key]]: value };
      console.warn(`Unknown key "${key}" in acl will be ignored`);
      return acc;
    },
    {}
  );
};
const prepareAcl = convertAcl({
  readRoles: ACL_READ,
  writeRoles: ACL_WRITE,
  deleteRoles: ACL_DELETE,
  metaReadRoles: ACL_META_READ,
  metaWriteRoles: ACL_META_WRITE,
});

const readAcl = convertAcl({
  [ACL_READ]: "readRoles",
  [ACL_WRITE]: "writeRoles",
  [ACL_DELETE]: "deleteRoles",
  [ACL_META_READ]: "metaReadRoles",
  [ACL_META_WRITE]: "metaWriteRoles",
});

const ensureInteger = (key: string, value: unknown) => {
  if (Number.isInteger(value)) return value;
  throw new Error(`Invalid stream metadata: "${key}" must be an integer.`);
};

export const prepareStreamMetadata = <
  CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
>(
  metadata: StreamMetadata<CustomMetadata>
): Record<string, unknown> =>
  Object.entries(metadata).reduce((acc, [key, value]) => {
    switch (key) {
      case "maxAge":
        return { ...acc, [MAX_AGE]: ensureInteger(key, value) };
      case "truncateBefore":
        return { ...acc, [TRUNCATE_BEFORE]: ensureInteger(key, value) };
      case "cacheControl":
        return { ...acc, [CACHE_CONTROL]: ensureInteger(key, value) };
      case "maxCount":
        return { ...acc, [MAX_COUNT]: ensureInteger(key, value) };
      case "acl":
        return { ...acc, [ACL]: prepareAcl(value) };
      default:
        return { ...acc, [key]: value };
    }
  }, {});

export const readStreamMetadata = <
  CustomMetadata extends CustomStreamMetadata = CustomStreamMetadata
>(
  metadata: Record<string, unknown>
): StreamMetadata<CustomMetadata> =>
  Object.entries(metadata).reduce((acc, [key, value]) => {
    switch (key) {
      case MAX_AGE:
        return { ...acc, maxAge: value };
      case TRUNCATE_BEFORE:
        return { ...acc, truncateBefore: value };
      case CACHE_CONTROL:
        return { ...acc, cacheControl: value };
      case MAX_COUNT:
        return { ...acc, maxCount: value };
      case ACL:
        return { ...acc, acl: readAcl(value) };
      default:
        return { ...acc, [key]: value };
    }
  }, {}) as StreamMetadata<CustomMetadata>;
