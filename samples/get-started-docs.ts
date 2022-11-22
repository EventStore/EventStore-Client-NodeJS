import {EventStoreDBClient} from "@eventstore/db-client";

// region createClient
const client = EventStoreDBClient.connectionString`{connectionString}`;
// endregion createClient
