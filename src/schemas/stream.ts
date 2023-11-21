import * as constants from "../constants";
import { z } from "zod";
import {
  appendExpectedRevision,
  baseOptions,
  direction,
  expectedRevision,
  filter,
  readPosition,
  readRevision,
} from "./common";
import {
  AppendToStreamOptions,
  DeleteStreamOptions,
  ReadAllOptions,
  ReadStreamOptions,
  SetStreamMetadataOptions,
  SubscribeToStreamOptions,
  TombstoneStreamOptions,
} from "../streams";
import {
  StreamACL,
  SystemStreamMetadata,
} from "../streams/utils/streamMetadata";

export const streamName = z.string({
  invalid_type_error: "Stream name must be a string",
  required_error: "Stream name is required",
});

export const appendToStreamOptions = baseOptions.extend({
  expectedRevision: appendExpectedRevision.optional(),
  batchAppendSize: z
    .number()
    .optional()
    .default(3 * 1024 * 1024),
}) satisfies z.ZodType<AppendToStreamOptions>;

export const deleteStreamOptions = baseOptions.extend({
  expectedRevision: expectedRevision.optional(),
}) satisfies z.ZodType<DeleteStreamOptions>;

export const getStreamMetadataOptions = baseOptions.extend({});

export const readAllOptions = baseOptions.extend({
  maxCount: z
    .union([
      z.number().min(0),
      z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
    ])
    .optional()
    .default(Number.MAX_SAFE_INTEGER),
  fromPosition: readPosition.optional().default(constants.START),
  resolveLinkTos: z.boolean().optional().default(false),
  direction: direction.optional().default(constants.FORWARDS),
}) satisfies z.ZodType<ReadAllOptions>;

export const readStreamOptions = baseOptions.extend({
  maxCount: z
    .union([
      z.number().min(0),
      z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
    ])
    .optional()
    .default(Number.MAX_SAFE_INTEGER),
  fromRevision: readRevision.optional().default(constants.START),
  resolveLinkTos: z.boolean().optional().default(false),
  direction: direction.optional().default(constants.FORWARDS),
}) satisfies z.ZodType<ReadStreamOptions>;

export const streamACL = z.object({
  readRoles: z.array(z.string()).optional(),
  writeRoles: z.array(z.string()).optional(),
  deleteRoles: z.array(z.string()).optional(),
  metaReadRoles: z.array(z.string()).optional(),
  metaWriteRoles: z.array(z.string()).optional(),
}) satisfies z.ZodType<StreamACL>;

export const systemStreamMetadata = z.object({
  maxAge: z.number().min(0).optional(),
  truncateBefore: z
    .union([
      z.literal(constants.START),
      z.literal(constants.END),
      z.number().min(0),
    ])
    .optional(),
  cacheControl: z.number().min(0).optional(),
  acl: streamACL.optional(),
  maxCount: z.number().min(0).optional(),
}) satisfies z.ZodType<SystemStreamMetadata>;

export const customStreamMetadata = z.record(
  z.string(),
  z.unknown()
) satisfies z.ZodType<Record<string, unknown>>;

export const streamMetadata = systemStreamMetadata.and(
  customStreamMetadata
) satisfies z.ZodType<SystemStreamMetadata & Record<string, unknown>>;

export const setStreamMetadataOptions = baseOptions.extend({
  expectedRevision: appendExpectedRevision.optional().default(constants.ANY),
}) satisfies z.ZodType<SetStreamMetadataOptions>;

export const subscribeToAllOptions = baseOptions.extend({
  fromPosition: readPosition.optional().default(constants.START),
  resolveLinkTos: z.boolean().optional().default(false),
  filter: filter.optional(),
}) satisfies z.ZodType<ReadAllOptions>;

export const subscribeToStreamOptions = baseOptions.extend({
  fromRevision: readRevision.optional().default(constants.START),
  resolveLinkTos: z.boolean().optional().default(false),
}) satisfies z.ZodType<SubscribeToStreamOptions>;

export const tombstoneStreamOptions = baseOptions.extend({
  expectedRevision: expectedRevision.optional().default(constants.ANY),
}) satisfies z.ZodType<TombstoneStreamOptions>;
