import {
  EventStoreDBClient,
  PersistentSubscriptionSettings,
  persistentSubscriptionToStreamSettingsFromDefaults,
  PersistentSubscriptionToAllSettings,
  persistentSubscriptionToAllSettingsFromDefaults,
} from "@eventstore/db-client";

export type CreatedPS = [
  streamName: string,
  groupName: string,
  settings: PersistentSubscriptionSettings
];

export const createManyPs =
  (client: EventStoreDBClient) =>
  async (
    streamName: (i: number) => string,
    groupName: (i: number) => string,
    settingsChanges: Partial<PersistentSubscriptionSettings>[]
  ): Promise<CreatedPS[]> => {
    const created: CreatedPS[] = [];

    for (const [i, settingsChange] of settingsChanges.entries()) {
      const toCreate: CreatedPS = [
        streamName(i),
        groupName(i),
        persistentSubscriptionToStreamSettingsFromDefaults(settingsChange),
      ];

      await client.createPersistentSubscriptionToStream(...toCreate);

      created.push(toCreate);
    }

    return created;
  };

export type CreatedPSToAll = [
  streamName: "$all",
  groupName: string,
  settings: PersistentSubscriptionToAllSettings
];

export const createManyPsToAll =
  (client: EventStoreDBClient) =>
  async (
    groupName: (i: number) => string,
    settingsChanges: Partial<PersistentSubscriptionToAllSettings>[]
  ): Promise<CreatedPSToAll[]> => {
    const created: CreatedPSToAll[] = [];

    for (const [i, settingsChange] of settingsChanges.entries()) {
      const toCreate: CreatedPSToAll = [
        "$all",
        groupName(i),
        persistentSubscriptionToAllSettingsFromDefaults(settingsChange),
      ];

      await client.createPersistentSubscriptionToAll(toCreate[1], toCreate[2]);

      created.push(toCreate);
    }

    return created;
  };
