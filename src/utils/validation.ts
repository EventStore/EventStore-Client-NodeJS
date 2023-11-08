import { ZodError, ZodSchema } from "zod";
import { ValidationError } from "./CommandError";

export const validateField = <T>(schema: ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // we don't want to spam the user with all the errors. Take the first one.
      const message = error.issues[0].message;

      throw new ValidationError(null as never, message);
    }

    throw error;
  }
};
