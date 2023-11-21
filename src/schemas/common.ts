import { z } from "zod";
import * as constants from "../constants";
import {
  AppendExpectedRevision,
  BinaryEventType,
  Credentials,
  EventType,
  ExpectedRevision,
  Filter,
  FilterBase,
  FilterOn,
  JSONEventType,
  JSONType,
  MetadataType,
  Position,
  ReadPosition,
  ReadRevision,
  RegexFilter,
} from "../types";

export const credentials = z.object({
  username: z.string(),
  password: z.string(),
}) satisfies z.ZodType<Credentials>;

export const baseOptions = z.object({
  credentials: credentials.optional(),
  requiresLeader: z.boolean().optional(),
  deadline: z.number().min(0).optional(),
}) satisfies z.ZodType;

export const jsonType = z.union([
  z.record(z.union([z.string(), z.number()]), z.unknown()),
  z.array(z.unknown()),
  z.string(),
]) satisfies z.ZodType<JSONType>;

export const metadataType = z.union([
  jsonType,
  z.instanceof(Uint8Array),
]) satisfies z.ZodType<MetadataType>;

export const jsonEventType = z.object({
  type: z.string(),
  data: jsonType,
  metadata: metadataType.optional(),
}) satisfies z.ZodType<JSONEventType>;

export const binaryEventType = z.object({
  type: z.string(),
  data: z.instanceof(Uint8Array),
  metadata: metadataType.optional(),
}) satisfies z.ZodType<BinaryEventType>;

export const eventType = z.union([
  jsonEventType,
  binaryEventType,
]) satisfies z.ZodType<EventType>;

export const jsonEventData = z.object({
  id: z.string().uuid(),
  contentType: z.literal("application/json"),
  type: z.string(),
  data: jsonType,
  metadata: metadataType.optional(),
});

export const binaryEventData = z.object({
  id: z.string().uuid(),
  contentType: z.literal("application/octet-stream"),
  type: z.string(),
  data: z.instanceof(Uint8Array),
  metadata: metadataType.optional(),
});

export const eventData = z.array(z.union([binaryEventData, jsonEventData]));

export const position = z.object({
  commit: z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
  prepare: z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
}) satisfies z.ZodType<Position>;

export const direction = z.union([
  z.literal(constants.FORWARDS),
  z.literal(constants.BACKWARDS),
]);

export const readPosition = z.union([
  z.literal(constants.START),
  z.literal(constants.END),
  position,
]) satisfies z.ZodType<ReadPosition>;

export const readRevision = z.union([
  z.literal(constants.START),
  z.literal(constants.END),
  z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
]) satisfies z.ZodType<ReadRevision>;

export const expectedRevision = z.union([
  z.literal(constants.ANY),
  z.literal(constants.NO_STREAM),
  z.literal(constants.STREAM_EXISTS),
  z.bigint().min(BigInt("0")).max(BigInt("0xffffffffffffffff")),
]) satisfies z.ZodType<ExpectedRevision>;

export const appendExpectedRevision = z.union([
  z.literal(constants.STREAM_EXISTS),
  expectedRevision,
]) satisfies z.ZodType<AppendExpectedRevision>;

export const filterOn = z.union([
  z.literal(constants.EVENT_TYPE),
  z.literal(constants.STREAM_NAME),
]) satisfies z.ZodType<FilterOn>;

export const filterBase = z.object({
  filterOn: filterOn,
  checkpointInterval: z.number(),
  maxSearchWindow: z.number().optional(),
}) satisfies z.ZodType<FilterBase>;

export const regexFilter = filterBase.extend({
  regex: z.string(),
}) satisfies z.ZodType<RegexFilter>;

export const prefixesFilter = filterBase.extend({
  prefixes: z.array(z.string()),
}) satisfies z.ZodType<FilterBase>;

export const filter = z.union([
  regexFilter,
  prefixesFilter,
]) satisfies z.ZodType<Filter>;
