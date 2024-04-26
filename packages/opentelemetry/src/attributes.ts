const esdb = "db.eventstoredb";
const db = "db";
const server = "server";
const exception = "exception";
const streams = "streams";

const customAttributes = {
  EVENT_STORE_STREAM: `${esdb}.stream`,
  EVENT_STORE_SUBSCRIPTION_ID: `${esdb}.subscription_id`,
  EVENT_STORE_EVENT_ID: `${esdb}.event.id`,
  EVENT_STORE_EVENT_TYPE: `${esdb}.event.type`,
};

export const EventStoreDBAttributes = {
  DATABASE_USER: `${db}.user`,
  DATABASE_SYSTEM: `${db}.system`,
  DATABASE_OPERATION: `${db}.operation`,

  SERVER_ADDRESS: `${server}.address`,
  SERVER_PORT: `${server}.port`,

  EXCEPTION_TYPE: `${exception}.type`,
  EXCEPTION_MESSAGE: `${exception}.message`,
  EXCEPTION_STACKTRACE: `${exception}.stacktrace`,

  STREAM_APPEND: `${streams}.append`,
  STREAM_SUBSCIBE: `${streams}.subscribe`,
  STREAM_PERSISTENT_SUBSCRIBE: `${streams}.persistent_susbcribe`,

  ...customAttributes,
};
