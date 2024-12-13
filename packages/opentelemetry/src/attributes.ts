const kdb = "db.kdb";
const db = "db";
const server = "server";
const streams = "streams";

export const KurrentDBAttributes = {
  DATABASE_USER: `${db}.user`,
  DATABASE_SYSTEM: `${db}.system`,
  DATABASE_OPERATION: `${db}.operation`,

  SERVER_ADDRESS: `${server}.address`,
  SERVER_PORT: `${server}.port`,

  STREAM_APPEND: `${streams}.append`,
  STREAM_SUBSCRIBE: `${streams}.subscribe`,

  KURRENT_DB_STREAM: `${kdb}.stream`,
  KURRENT_DB_SUBSCRIPTION_ID: `${kdb}.subscription.id`,
  KURRENT_DB_EVENT_ID: `${kdb}.event.id`,
  KURRENT_DB_EVENT_TYPE: `${kdb}.event.type`,
};
