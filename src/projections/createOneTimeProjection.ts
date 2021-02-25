import { Empty } from "../../generated/shared_pb";
import { ProjectionsClient } from "../../generated/projections_grpc_pb";
import { CreateReq } from "../../generated/projections_pb";

import { BaseOptions } from "../types";
import { debug, convertToCommandError } from "../utils";
import { Client } from "../Client";

export interface CreateOneTimeProjectionOptions extends BaseOptions {}

declare module "../Client" {
  interface Client {
    /**
     * Creates a one time projection.
     * @param query The query to run.
     * @param options Deletion options.
     */
    createOneTimeProjection(
      query: string,
      options?: CreateOneTimeProjectionOptions
    ): Promise<void>;
    createOneTimeProjection(
      query: TemplateStringsArray,
      ...parts: string[]
    ): Promise<void>;
  }
}

Client.prototype.createOneTimeProjection = async function (
  this: Client,
  query: string | TemplateStringsArray,
  baseOptions: CreateOneTimeProjectionOptions | string = {},
  ...parts: string[]
): Promise<void> {
  const req = new CreateReq();
  const options = new CreateReq.Options();

  const queryString: string = Array.isArray(query)
    ? query.reduce<string>(
        (acc, chunk, i) =>
          `${acc}${chunk}${i === 0 ? baseOptions : parts[i - 1] ?? ""}`,
        ""
      )
    : (query as string);

  options.setOneTime(new Empty());
  options.setQuery(queryString);

  req.setOptions(options);

  debug.command("createOneTimeProjection: %O", {
    queryString,
    options: typeof baseOptions !== "string" ? baseOptions : {},
  });
  debug.command_grpc("createOneTimeProjection: %g", req);

  const client = await this.getGRPCClient(
    ProjectionsClient,
    "createOneTimeProjection"
  );

  return new Promise<void>((resolve, reject) => {
    client.create(
      req,
      ...this.callArguments(typeof baseOptions === "string" ? {} : baseOptions),
      (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      }
    );
  });
};
