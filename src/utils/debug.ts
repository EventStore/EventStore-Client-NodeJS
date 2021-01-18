/* istanbul ignore file */

import createDebug from "debug";

createDebug.formatters.g = function (v) {
  return createDebug.formatters.O.call(this, v.toObject());
};

const base = createDebug("esdb");
const command = base.extend("command");
const command_grpc = command.extend("grpc");
const connection = base.extend("connection");
const events = base.extend("events");

export const debug = {
  command,
  command_grpc,
  connection,
  events,
};
