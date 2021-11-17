## [v3.0.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v2.1.1...v3.0.0) (WIP)

### Breaking changes

#### EventStoreDBClient

- The default node preference is now `LEADER`. This applies when connecting with a connection string, and via the client constructor. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/96dfcfc3ae5536df1d7cf22b173c00044120f25f)

#### Persistent Subscriptions

The persistent subscriptions api has been updated to align with other eventstore clients, and the new persistent subscriptions to all api.

- `connectToPersistentSubscription` has been renamed to `subscribeToPersistentSubscription` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/5266130e5794dfa3505160a7a61165b15ed32e9c)
- `persistentSubscriptionSettings` keys and default values have been changed. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/f7d5f7db012000ef82dac0e8b6fbcd4d598d812a)

<table>
  <thead>
    <tr>
      <th>Key</th> 
      <th>Default</th> 
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre lang="diff">
- fromRevision
+ startFrom</pre>
      </td>
      <td>
        <pre lang="diff">
- START
+ END</pre>
      </td>
      <td>The exclusive position in the stream or transaction file the subscription should start from.</td>
    </tr>
    <tr>
      <td>
        <pre lang="diff">
- extraStats
+ extraStatistics</pre>
      </td>
      <td><code>false</code></td>
      <td>Enables if depth latency statistics should be tracked on subscription.</td>
    </tr>
    <tr>
      <td>
        <pre lang="diff">
- checkpointAfter
+ checkPointAfter</pre>
      </td>
      <td><code>2_000</code></td>
      <td>The amount of time to try checkpoint after in milliseconds.</td>
    </tr>
    <tr>
      <td>
        <pre lang="diff">
- minCheckpointCount
+ checkPointLowerBound</pre>
      </td>
      <td><code>10</code></td>
      <td>The minimum number of messages to process before a checkpoint may be written.</td>
    </tr>
    <tr>
      <td>
        <pre lang="diff">
- maxCheckpointCount
+ checkPointUpperBound</pre>
      </td>
      <td><code>1_000</code></td>
      <td>The maximum number of messages to process before a checkpoint may be written.</td>
    </tr>
    <tr>
      <td><code>maxSubscriberCount</code></td>
      <td>
        <pre lang="diff">
- UNLIMITED
+ UNBOUNDED</pre>
      </td>
      <td>The maximum number of subscribers allowed..</td>
    </tr>
    <tr>
      <td>
        <pre lang="diff">
- strategy
+ consumerStrategyName</pre>
      </td>
      <td><code>ROUND_ROBIN</code></td>
      <td>The strategy to use for distributing events to client consumers.</td>
    </tr>
    <tr>
      <td colspan="3" align="center">-- The following options remain unchanged. --</td>
    </tr>
    <tr>
      <td><code>resolveLinkTos</code></td>
      <td><code>false</code></td>
      <td>Also return events targeted by the links.</td>
    </tr>
    <tr>
      <td><code>messageTimeout</code></td>
      <td><code>30_000</code></td>
      <td>The amount of time in milliseconds after which a message should be considered to be timeout and retried.</td>
    </tr>
    <tr>
      <td><code>maxRetryCount</code></td>
      <td><code>10</code></td>
      <td>The maximum number of retries (due to timeout) before a message is considered to be parked.</td>
    </tr>
    <tr>
      <td><code>liveBufferSize</code></td>
      <td><code>500</code></td>
      <td>The size of the buffer listening to live messages as they happen.</td>
    </tr>
    <tr>
      <td><code>readBatchSize</code></td>
      <td><code>20</code></td>
      <td>The number of events read at a time when paging in history.</td>
    </tr>
    <tr>
      <td><code>historyBufferSize</code></td>
      <td><code>500</code></td>
      <td>The number of events to cache when paging through history.</td>
    </tr>
  </tbody>
</table>

- Constant `UNLIMITED` has been renamed to `UNBOUNDED`. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/f7d5f7db012000ef82dac0e8b6fbcd4d598d812a)

#### Projections

The projections api has been completely overhauled, removing one time and transient projections. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d9fc4d1b40b7e65195f12dcc387c9028eceafcdc)

- `createProjection`:
  - `createContinuousProjection` has been renamed to `createProjection`.
  - `createOneTimeProjection` has been removed.
  - `createTransientProjection` has been removed.
- `listProjections`:
  - `listContinuousProjections` has been renamed to `listProjections`.
  - `listOneTimeProjections` has been removed.
  - `listTransientProjections` has been removed.
  - `mode` has been removed from `ProjectionDetails`, only `CONTINUOUS` projections are returned.
  - `CONTINUOUS` `ONE_TIME` & `TRANSIENT` constants have been removed.
- `resetProjection`:
  - `writeCheckpoint` option has been removed. (It previously had no effect ).
- `disableProjection`:
  - `writeCheckpoint` option has been removed. Use `abortProjection` if wishing to set this to `false`.
- `abortProjection`:
  - `abortProjection` method has been added.
- `deleteProjection`:
  - `deleteEmittedStreams` option now defaults to `false`.
  - `deleteStateStream` option now defaults to `false`.
  - `deleteCheckpointStream` option now defaults to `false`.

### Features

#### Persistent Subscriptions to all

The client now supports persistent subscriptions to the all stream, for server version `21.10` and greater.

- Added `createPersistentSubscriptionToAll` method. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/f7d5f7db012000ef82dac0e8b6fbcd4d598d812a)

```ts
const groupName = "my_persistent_subscription";
const settings = persistentSubscriptionToAllSettingsFromDefaults({
  // start from the beginning of the all stream
  startFrom: START,
});
// Filter only events with type matching regex
const filter = eventTypeFilter({
  regex: "^[0-9]*_regex_filter_eventType_[A-z]*$",
});

// Create a persistent subscrition to the all stream
await client.createPersistentSubscriptionToAll(groupName, settings, { filter });
```

- Added `subscribeToPersistentSubscriptionToAll` method. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/bf660ef1d82c02cf577de439db2c5b5529399c0a)

```ts
// Connect to the created persistent subscription to all stream
const psToAll = client.subscribeToPersistentSubscriptionToAll(groupName);

for await (const event of psToAll) {
  doSomethingWithEvent(event);
  // Acknowledge that the event has been handled
  await psToAll.ack(event);
}
```

- Added `updatePersistentSubscriptionToAll` method. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/75aa261f6307408383b20a98447782ca77ce75c7)

```ts
const updatedSettings =  persistentSubscriptionToAllSettingsFromDefaults({
  // Ensure that our previous settings are persisted
  ...settings,
  // Enable extra statistics
  extraStatistics: true,
});

// Update the persistent subscription to use new settings.
await client.updatePersistentSubscriptionToAll(groupName, updatedSettings)l

```

- Added `deletePersistentSubscriptionToAll` method. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/cf4fa765282fe00cc3195acafcb75421fcd5f733)

```ts
// delete the unwanted persistent subscription to all
await client.deletePersistentSubscriptionToAll(groupName);
```

#### Other features

- When connected to server version `21.10` and greater, the client will now send appended events over a single duplex stream, resulting in much faster append times. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/4e764c1d3ca20627553ad16588a259d63283a31b)
- Client now internally checks if the server supports an api before sending a request. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/4122f6f17756c7a4deff0288bfb8af9adfca4aee)

### Bug Fixes

- Fixed incorrect log message where http was logged as https and vice versa. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/b056749de06338675fab25af35edb47f1042446d)
- `updateProjection` option `trackEmittedStreams` name has been corrected as `emitEnabled`. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d9fc4d1b40b7e65195f12dcc387c9028eceafcdc)

- Prevent `WRITE_AFTER_END` from still being uncaught in rare cases. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/a1ba19a86fc440ceedc06b75a968ec1901f6eeec)

## [v2.1.1](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v2.1.0...v2.1.1) (2021-09-29)

### Bug Fixes

- Ack and nack take a resolved event, rather than an event id [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/965dd70ae6ecadd1f4398e698299bea8b2aaa91e)
- Prevent `appendToStream` from writing after the stream has closed [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/75aa47d0f9769cc77d340ed941469b609e80690f)

### Deprecations

- Ack and nack via event id [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/965dd70ae6ecadd1f4398e698299bea8b2aaa91e)
  - Will be removed in `v3.0.0`.
  - Pass entire resolved event

## [v2.1.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v2.0.0...v2.1.0) (2021-08-05)

### Features

- `checkpointReached` callback added to filter to allow checkpointing filtered reads to all [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/0743b3d74a08a30b7476876e70fe7edf05e76b35)
- `LinkEvent` type added to event types [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/0183f104318a4ccf7547541b95d2f4bac6384e24)
- `resolveLinkTos` option added to `readAll` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/0183f104318a4ccf7547541b95d2f4bac6384e24)

### Bug Fixes

- `parseConnectionString` allows different casings of `nodePreference` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/9f1440d89070b3f6aee82ddfd50c3793f5f61bb0)

## [v2.0.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.2.2...v2.0.0) (2021-07-28)

### Breaking changes

- `readStream` and `readAll` return a stream of events [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/2dd21e66ad903e5fc111ca2105ace51817dc5cb0)

To allow for reading large numbers of events without running out of memory, `readSteam` and `readAll` now return a [readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) rather than a promise of an array.

Before `v1.x`:

```ts
const events = await client.readStream<MyEventTypes>(streamName);

for (const event of events) {
  doSomething(event);
}
```

After `v2.x`:

```ts
const eventStream = client.readStream<MyEventTypes>(streamName);

for await (const event of eventStream) {
  doSomething(event);
}
```

### Features

- Reconnect on node loss [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/83e0145d3fcdf4a0713f84d5d58575148008249a)
- `readonlyreplica` node preference [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/0c5d29e3337502a3baf32452906b08691cc17c10)
- Faster data encoding [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/4cda18001f07f32eceb93a47644e8697fc4963ee)

### Bug Fixes

- Ensure member is in a connectable state during discovery [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/0c5d29e3337502a3baf32452906b08691cc17c10)

### Removal of Deprecated Apis

- `ConnectionTypeOptions` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/5128e82a2d054aa5dd45f097d5095b60d35546da)

## [v1.2.2](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.2.1...v1.2.2) (2021-06-18)

### Features

- `DNSClusterOptions` `GossipClusterOptions` `SingleNodeOptions` types individually exported. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/16787856a5c5567dc3ca0bd86523f482c6af1def)

### Deprecations

- `ConnectionTypeOptions` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/16787856a5c5567dc3ca0bd86523f482c6af1def)
  - Will be removed in `v2.0.0`.
  - Use newly exported members directly.

## [v1.2.1](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.2.0...v1.2.1) (2021-04-30)

### Features

- `ChannelCredentialOptions` interface exported. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d40e33ca40c15e6a1262a3b77c47da9bf079e0ee)

## [v1.2.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.1.2...v1.2.0) (2021-04-22)

### Features

- Pass path to Certificate File in Connection String [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/9dc294991736ea5e6e26f302d393f2be86471ab8)

## [v1.1.2](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.1.1...v1.1.2) (2021-04-12)

### Bug Fixes

- Allow setting END for create persistent subscription `fromRevision` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/710d4a0c04a314e5a27f0c786ac17a69706c4b31)

## [v1.1.1](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.1.0...v1.1.1) (2021-04-06)

### Bug Fixes

- Remove `console.log` in`TwoWaySubscription` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/9d33ea9939c5c6cb62406c80feb2ccf88756fb89)

## [v1.1.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.0.2...v1.1.0) (2021-03-29)

### Features

- Add stream metadata methods [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/8fb2c4f95c6a2356e998790203ea78b04e8bd137)
  - `setStreamMetadata`
  - `getStreamMetadata`

## [v1.0.2](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.0.1...v1.0.2) (2021-03-23)

### Bug Fixes

- Replace all buffer encoding and decoding from `binary` (latin1) to `utf8` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d7bde0397096446e0f269381c6f678a4194fa79e)

## [v1.0.1](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v1.0.0...v1.0.1) (2021-02-25)

### Features

- Improved JSdoc comments [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/6e88a35c4ff118902a8952e88f89bae982e63e15)

### Bug Fixes

- Allow whitespace between tokens in connection string [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/63020d0639e01c66f9e9763ed7874d6be4c78063)

## [v1.0.0](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.17...v1.0.0) (2021-02-17)

### Features

- Keep alives [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/7934736faedf4e7ddec1d95a0a6561a3bb3bd8ac)
  - Keep server connection alive when network traffic is low.

## [v0.0.0-alpha.17](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.16...v0.0.0-alpha.17) (2021-02-11)

### Features

- Event types [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/243958a8b6d2a56bc17eb239408c0826a4905c0d)
  - Strongly type your events in `readEvents`, `subscribeToEvents` and `connectToPersistantSubscription`.

## [v0.0.0-alpha.16](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.15...v0.0.0-alpha.16) (2021-02-04)

### Bug Fixes

- `count` renamed to `maxCount` and made optional [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/3bea69d575932bfd5c0870c6da6ffe143e113019)
- Do not send credentials over insecure connection [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/3823115776b5555ba20ba7919be134f83f7d576a)

## [v0.0.0-alpha.15](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.14...v0.0.0-alpha.15) (2021-01-27)

### Bug Fixes

- Apply workaround for http2 assertion failure [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/92977d1cca5343ee604b9e519b9b77061216985f)

## [v0.0.0-alpha.14](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.13...v0.0.0-alpha.14) (2021-01-25)

### Features

- Improved `subscribeToAll` filters [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/972d7eba9291fb65b5a576d3b619377aa5a80ac3)
- `excludeSystemEvents` helper [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/395cd9a829b7bbe8c061d7263a0122ad13f5e0b2)

## [v0.0.0-alpha.13](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.12...v0.0.0-alpha.13) (2021-01-14)

### Features

- Discovery options [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/ce0c488495fc7b4780b89d0576342027f2547979)
- `throwOnAppendFailure` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/a10bb649e77f486ff2ac6dfba6bc5182793dc398)
- Correct naming `nextExpectedVersion` to `nextExpectedRevision` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/4f470625d96fe0943e11727d9473afdd0d7d9bd2)

### Bug Fixes

- Case-insensitive keys in connection string (#109) [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/ac6e02c640ef80111dd903ea3e73a142dc4924f9)
- Don't assume that metadata matches the event type [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/dd0992487811248bfe66dba883b8f1afaaead4fd)
- Prevent possible Channel race condition, that could allow a client to send requests to separate nodes. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/f8bb84e15657e3a71f00db19c1c6b77d347419e5)

## [v0.0.0-alpha.12](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.11...v0.0.0-alpha.12) (2020-12-30)

### Features

- Add generics to event types [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/1f51cf687dd6dcb1cc1a14d888a65d19c0b317c8)

### Bug Fixes

- Incorrect name in `subscribeToStream` debug messages [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d20ab4cb8a77334de50545ccb850497fcffbed3f)
- .NET Client naming alignment [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/eebe7737e4ac5e632d7d2493c0919e593c35f010)

## [v0.0.0-alpha.11](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.10...v0.0.0-alpha.11) (2020-12-22)

### Bug Fixes

- Fix streams for node version 12.x [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/b5d0f1b7d621f06d73f338d459647daf2aa122f7)

## [v0.0.0-alpha.10](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.9...v0.0.0-alpha.10) (2020-12-21)

### Features

- Subscriptions return `ReadableStreams` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/f3b4ed4149d6d8f1b0133884db494f152c7b6dac)

### Bug Fixes

- .NET Client naming alignment [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/54096c9658a9c6474f02f18a37a37f3e66adca89)

## [v0.0.0-alpha.9](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.8...v0.0.0-alpha.9) (2020-12-08)

### Features

- large internal refactor

### Bug Fixes

- Update DNS discovery to work properly with EventStore Cloud. [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/c6c510af1662f48a57b6ba06815d53d67a31ecce)

## [v0.0.0-alpha.8](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.7...v0.0.0-alpha.8) (2020-11-19)

### Bug Fixes

- Don't assume that events with content type `application/json` contain valid JSON [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/9c90fbc19cd35a08134f5918b35ae72541672fd5)

## [v0.0.0-alpha.7](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.6...v0.0.0-alpha.7) (2020-11-04)

### Features

- Connection string [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/bb5e14f0b448d7a3915c4b97193cadd325d5b5e7)
- `defaultCredentials` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/4a07ef50acae3de0793bff5ceac3d144483574b4)

### Bug Fixes

- Test utilities accidentally being included in package [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/ee88c6c4799eeeb864047822e22fa933fde06d97)

## [v0.0.0-alpha.6](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.5...v0.0.0-alpha.6) (2020-10-30)

## [v0.0.0-alpha.5](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.4...v0.0.0-alpha.5) (2020-10-30)

### Features

- Projections API [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/1e1cbf65936443b7b16ace3f64144851fc7e43ef)

### Bug Fixes

- Use secure by default [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/08ee2042f6c816abcc516fc2f793ba373ab59f86)

## [v0.0.0-alpha.4](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.3...v0.0.0-alpha.4) (2020-10-21)

### Features

- debugging [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/348b05be8fafe94a1fc2eeab8fae47585824de8f)

  - Set the `DEBUG` environment variable to `esdb:*` to enable debug logs

### Bug Fixes

- `streamName` is correctly converted to as string in `StreamNotFoundError` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/231f60a37db817be557322598af315376619fd83)

## [v0.0.0-alpha.3](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.2...v0.0.0-alpha.3) (2020-10-09)

## [v0.0.0-alpha.2](https://github.com/EventStore/EventStore-Client-NodeJS/compare/v0.0.0-alpha.1...v0.0.0-alpha.2) (2020-09-29)

### Bug Fixes

- Do not return position on stream read events [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/1764a2a73f76b2a2e05593e2f7659fb0b9312e0c)
- Remove `no_stream` `expectedRevision` from `tombstone` (not supported by server) [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/47a0c666ef187ead7e0eaa2db97631f2e78dcd03)
- Fix `ack` and `nack` [View](https://github.com/EventStore/EventStore-Client-NodeJS/commit/d144b6f9741679cb75f55420a54ba2da7dd968de)
