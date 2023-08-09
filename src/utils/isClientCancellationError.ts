import { ServiceError, status } from "@grpc/grpc-js";

const isServiceError = (error: Error): error is ServiceError => "code" in error;
export const isClientCancellationError = (err: unknown): boolean => {
  return (
    err instanceof Error &&
    isServiceError(err) &&
    err.code === status.CANCELLED &&
    err.details === "Cancelled on client"
  );
};
