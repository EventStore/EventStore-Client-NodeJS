import type { StatisticsResp } from "../../generated/projections_pb";

import type {
  ProcessingStatus,
  ProjectionDetails,
  ProjectionStatus,
} from "../types";

export const convertGrpcProjectionDetails = (
  grpcProjectionDetails: StatisticsResp.Details
): ProjectionDetails => {
  const details = grpcProjectionDetails.toObject();
  const [projectionStatus, processingStatus = ""] = details.status.split("/");

  return {
    coreProcessingTime: BigInt(details.coreprocessingtime),
    version: BigInt(details.version),
    epoch: BigInt(details.epoch),
    effectiveName: details.effectivename,
    writesInProgress: details.writesinprogress,
    readsInProgress: details.readsinprogress,
    partitionsCached: details.partitionscached,
    status: details.status,
    projectionStatus: projectionStatus as ProjectionStatus,
    processingStatus: processingStatus as ProcessingStatus,
    stateReason: details.statereason,
    name: details.name,
    position: details.position,
    progress: details.progress,
    lastCheckpoint: details.lastcheckpoint,
    eventsProcessedAfterRestart: BigInt(details.eventsprocessedafterrestart),
    checkpointStatus: details.checkpointstatus,
    bufferedEvents: BigInt(details.bufferedevents),
    writePendingEventsBeforeCheckpoint:
      details.writependingeventsbeforecheckpoint,
    writePendingEventsAfterCheckpoint:
      details.writependingeventsaftercheckpoint,
  };
};
