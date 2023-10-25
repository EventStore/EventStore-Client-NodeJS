import { z } from "zod";
import { START, BACKWARDS, END, FORWARDS } from "../constants";
import type { BaseOptions, Credentials, Direction, Position, ReadPosition } from "../types";
import type { ReadAllOptions } from "./readAll";

export const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
}) satisfies z.ZodType<Credentials>;

export const baseOptionsSchema = z.object({
  credentials: credentialsSchema.optional(),
  requiresLeader: z.boolean().optional(),
  deadline: z.number().optional(),
}) satisfies z.ZodType<BaseOptions>;

export const positionSchema = z.object({
  commit: z.bigint(),
  prepare: z.bigint(),
}) satisfies z.ZodType<Position>;

export const readPositionSchema = z.union([
  z.literal(START),
  z.literal(END),
  positionSchema,
]) satisfies z.ZodType<ReadPosition>;

export const directionSchema = z.union([
  z.literal(FORWARDS),
  z.literal(BACKWARDS),
]) satisfies z.ZodType<Direction>;

export const readAllOptionsSchema = baseOptionsSchema.extend({
  maxCount: z.union([z.number(), z.bigint()]).optional(),
  fromPosition: readPositionSchema.optional(),
  resolveLinkTos: z.boolean().optional(),
  direction: directionSchema.optional(),
}) satisfies z.ZodType<ReadAllOptions>;
