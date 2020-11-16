import createDebug from "debug";

createDebug.formatters.c = function (v) {
  const fields = Object.entries(v).reduce((acc, [key, value]) => {
    if (!key.startsWith("_")) return acc;
    return {
      ...acc,
      [key.substring(1)]: value,
    };
  }, {});

  return createDebug.formatters.O.call(this, fields);
};

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
