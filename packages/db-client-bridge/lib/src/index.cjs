"use strict";
// This module is the CJS entry point for the library.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
// The Rust addon.
const addon = require("./load.cjs");
function createClient(connStr) {
    const client = addon.createClient(connStr);
    return {
        async readStream(stream, options) {
            const iterable = await client.readStream(stream, options);
            return {
                [Symbol.asyncIterator]() {
                    return {
                        next() {
                            return iterable.next();
                        }
                    };
                }
            };
        }
    };
}
//# sourceMappingURL=index.cjs.map