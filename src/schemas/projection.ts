import { z } from "zod";
import { baseOptions } from "./common";
import {
  AbortProjectionOptions,
  CreateProjectionOptions,
  DeleteProjectionOptions,
  DisableProjectionOptions,
  EnableProjectionOptions,
  GetProjectionResultOptions,
  GetProjectionStateOptions,
  GetProjectionStatusOptions,
  ListProjectionsOptions,
  ResetProjectionOptions,
  RestartSubsystemOptions,
  UpdateProjectionOptions,
} from "../projections";

export const projectionName = z.string();

export const query = z.string();

export const createProjectionOptions = baseOptions.extend({
  emitEnabled: z.boolean().optional(),
  trackEmittedStreams: z.boolean().optional(),
}) satisfies z.ZodType<CreateProjectionOptions>;

export const createProjectionGrpcOptions = baseOptions.extend({
  emitEnabled: z.boolean().optional().default(false),
  trackEmittedStreams: z.boolean().optional().default(false),
}) satisfies z.ZodType<CreateProjectionOptions>;

export const createProjectionHttpOptions = baseOptions.extend({
  emitEnabled: z.boolean().optional().default(false),
  trackEmittedStreams: z.boolean().optional().default(false),
}) satisfies z.ZodType<CreateProjectionOptions>;

export const deleteProjectionOptions = baseOptions.extend({
  deleteEmittedStreams: z.boolean().optional().default(false),
  deleteStateStream: z.boolean().optional().default(false),
  deleteCheckpointStream: z.boolean().optional().default(false),
}) satisfies z.ZodType<DeleteProjectionOptions>;

export const disableProjectionOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<DisableProjectionOptions>;

export const abortProjectionOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<AbortProjectionOptions>;

export const enableProjectionOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<EnableProjectionOptions>;

export const getProjectionResultOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<GetProjectionResultOptions>;

export const getProjectionStateOptions = baseOptions.extend({
  partition: z.string().optional(),
}) satisfies z.ZodType<GetProjectionStateOptions>;

export const getProjectionStatusOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<GetProjectionStatusOptions>;

export const listProjectionsOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<ListProjectionsOptions>;

export const resetProjectionOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<ResetProjectionOptions>;

export const restartSubsystemOptions = baseOptions.extend(
  {}
) satisfies z.ZodType<RestartSubsystemOptions>;

export const updateProjectionOptions = baseOptions.extend({
  emitEnabled: z.boolean().optional(),
}) satisfies z.ZodType<UpdateProjectionOptions>;
