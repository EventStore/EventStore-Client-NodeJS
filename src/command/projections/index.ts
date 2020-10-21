import { CreateContinuousProjection } from "./CreateContinuousProjection";
import { CreateOneTimeProjection } from "./CreateOneTimeProjection";
import { CreateTransientProjection } from "./CreateTransientProjection";
import { DeleteProjection } from "./DeleteProjection";
import { DisableProjection } from "./DisableProjection";
import { EnableProjection } from "./EnableProjection";
import { GetProjectionResult } from "./GetProjectionResult";
import { GetProjectionState } from "./GetProjectionState";
import { GetProjectionStatistics } from "./GetProjectionStatistics";
import {
  ListContinuousProjections,
  ListOneTimeProjections,
  ListTransientProjections,
} from "./ListProjections";
import { ResetProjection } from "./ResetProjection";
import { RestartSubsystem } from "./RestartSubsystem";
import { UpdateProjection } from "./UpdateProjection";

/**
 * Creates a continuous projection.
 * @param name
 * @param query
 */
export const createContinuousProjection = (
  name: string,
  query: string
): CreateContinuousProjection => new CreateContinuousProjection(name, query);

/**
 * Creates a one-time projection.
 * @param query
 */
export const createOneTimeProjection = (
  query: string
): CreateOneTimeProjection => new CreateOneTimeProjection(query);

/**
 * Creates a transient projection.
 * @param name
 * @param query
 */
export const createTransientProjection = (
  name: string,
  query: string
): CreateTransientProjection => new CreateTransientProjection(name, query);

/**
 * Deletes a projection
 * @param name
 */
export const deleteProjection = (name: string): DeleteProjection =>
  new DeleteProjection(name);

/**
 * Disables a projection
 * @param name
 */
export const disableProjection = (name: string): DisableProjection =>
  new DisableProjection(name);

/**
 * Enables a projection
 * @param name
 */
export const enableProjection = (name: string): EnableProjection =>
  new EnableProjection(name);

/**
 * Gets the result of a projection
 * @param name
 */
export const getProjectionResult = <S = unknown>(
  name: string
): GetProjectionResult<S> => new GetProjectionResult<S>(name);

/**
 * Gets the state of a projection
 * @param name
 */
export const getProjectionState = <S = unknown>(
  name: string
): GetProjectionState<S> => new GetProjectionState<S>(name);

/**
 * Gets statistics of a single projection
 * @param name
 */
export const getProjectionStatistics = (
  name: string
): GetProjectionStatistics => new GetProjectionStatistics(name);

/**
 * Lists all continuous projections.
 */
export const listContinuousProjections = (): ListContinuousProjections =>
  new ListContinuousProjections();

/**
 * Lists all one-time projections.
 */
export const listOneTimeProjections = (): ListOneTimeProjections =>
  new ListOneTimeProjections();

/**
 * Lists all transient projections.
 */
export const listTransientProjections = (): ListTransientProjections =>
  new ListTransientProjections();

/**
 * Resets a projection. This will re-emit events. Streams that are written to from the projection will also be soft deleted.
 * @param name
 */
export const resetProjection = (name: string): ResetProjection =>
  new ResetProjection(name);

/**
 * Restarts the entire projection subsystem
 */
export const restartSubsystem = (): RestartSubsystem => new RestartSubsystem();

/**
 * Updates a projection
 * @param name
 */
export const updateProjection = (
  name: string,
  query: string
): UpdateProjection => new UpdateProjection(name, query);
