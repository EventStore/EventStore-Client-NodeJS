"use strict";
// This module loads the platform-specific build of the addon on
// the current system. The supported platforms are registered in
// the `platforms` object below, whose entries can be managed by
// by the Neon CLI:
//
//   https://www.npmjs.com/package/@neon-rs/cli
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = require('@neon-rs/load').proxy({
    platforms: {
        'win32-x64-msvc': () => require('@eventstore/db-client-bridge/win32-x64-msvc'),
        'darwin-x64': () => require('@eventstore/db-client-bridge/darwin-x64'),
        'darwin-arm64': () => require('@eventstore/db-client-bridge/darwin-arm64'),
        'linux-x64-gnu': () => require('@eventstore/db-client-bridge/linux-x64-gnu'),
        'linux-arm64-gnu': () => require('@eventstore/db-client-bridge/linux-arm64-gnu')
    },
    debug: () => require('../index.node')
});
//# sourceMappingURL=load.cjs.map