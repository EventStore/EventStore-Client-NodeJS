import { ProjectionsClient } from "../../../generated/projections_grpc_pb";
import { Empty } from "../../../generated/shared_pb";

import { ESDBConnection } from "../../types";
import { Command } from "../Command";
import { convertToCommandError } from "../../utils/CommandError";
import { debug } from "../../utils/debug";
import { CLIENT } from "../../symbols";

export class RestartSubsystem extends Command {
  /**
   * Restarts sub system
   */
  async execute(connection: ESDBConnection): Promise<void> {
    const req = new Empty();

    debug.command("RestartSubsystem: %c", this);
    debug.command_grpc("RestartSubsystem: %g", req);

    const client = await connection[CLIENT](
      ProjectionsClient,
      "RestartSubsystem"
    );

    return new Promise<void>((resolve, reject) => {
      client.restartSubsystem(req, this.metadata(connection), (error) => {
        if (error) return reject(convertToCommandError(error));
        return resolve();
      });
    });
  }
}
