# Contributing

Development is done on the `master` branch. We attempt to do our best to ensure that the history remains clean and to do so, we generally ask contributors to squash their commits into a set or single logical commit.

## Initial Setup

**Prerequisites:**
- Node.js (version 14 or higher, although version 12.18.3 is also supported)

**Repository Setup:**
1. Clone the repository:
   ```bash
   $ git clone git@github.com:EventStore/EventStore-Client-NodeJS.git
   $ cd EventStore-Client-NodeJS
   ```
2. Install all necessary dependencies:
   ```bash
   yarn install
   ```
3. Build the project for the first time:
   ```bash
   yarn build
   ```
   In case of build errors, refresh your setup with:
   ```bash
   npx lerna clean -y && yarn install
   ```

## Development Practices

**Code Compilation:**
- Standard Build:
  ```bash
  yarn run build
  ```
- Continuous Build on Changes:
  ```bash
  yarn run build:watch
  ```

**Testing and Linting:**
- Run the complete test suite:
  ```bash
  yarn run test
  ```
- Perform code style checks:
  ```bash
  yarn run lint
  ```

### Tests

Tests are written using [Jest] and require [Docker] and [Docker Compose] to be installed. Then run test with:

```shell script
yarn test
```

Tests can be filtered by prepending the test file or folder to the command

```shell script
$ yarn test connection // all connection tests
$ yarn test ReadAll // only the ReadAll tests
```

To get debug information when running tests use the `test:debug` command.

```shell script
$ yarn test:debug // debug all tests
$ yarn test:debug ReadAll // only the ReadAll tests
```

Specific docker images can be specified via the enviroment variable `EVENTSTORE_IMAGE`.

```shell script
$ yarn cross-env EVENTSTORE_IMAGE=77d63f3f0ab3 jest
```

See [Jest] documentation for more options.

### Debugging

This project uses the [debug] module internally to log information about connections, options and GRPC requests.
To see all the internal logs, set the DEBUG environment variable to `esdb:*` when launching your app.
Logs can be further filtered with glob patterns, for example, only connection logs: `esdb:connection`, everything but grpc logs: `esdb:*,-*:grpc`.

You can set a few environment variables that will further change the behavior of the debug logging:

| Name                | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_FD`          | File descriptor to write debug output to.         |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

**Note:** The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters.
See the Node.js documentation for [`util.inspect()`] for the complete list.

[docker compose]: https://docs.docker.com/compose/
[docker]: https://www.docker.com/
[jest]: https://jestjs.io/
[debug]: https://github.com/visionmedia/debug
[`util.inspect()`]: https://nodejs.org/api/util.html#util_util_inspect_object_options
[eventstore-client-nodejs]: https://github.com/EventStore/EventStore-Client-NodeJS