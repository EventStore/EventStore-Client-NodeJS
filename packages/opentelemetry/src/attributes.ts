const esdb = "db.eventstoredb";
const db = "db";
const server = "server";
const streams = "streams";

export const EventStoreDBAttributes = {
  DATABASE_USER: `${db}.user`,
  DATABASE_SYSTEM: `${db}.system`,
  DATABASE_OPERATION: `${db}.operation`,

  SERVER_ADDRESS: `${server}.address`,
  SERVER_PORT: `${server}.port`,

  STREAM_APPEND: `${streams}.append`,
  STREAM_SUBSCIBE: `${streams}.subscribe`,

  EVENT_STORE_STREAM: `${esdb}.stream`,
  EVENT_STORE_SUBSCRIPTION_ID: `${esdb}.subscription.id`,
  EVENT_STORE_EVENT_ID: `${esdb}.event.id`,
  EVENT_STORE_EVENT_TYPE: `${esdb}.event.type`,
};
