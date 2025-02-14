"use strict";

const assert = require("assert");

const addon = require("../lib");
const {describe, it} = require("node:test");

describe("readStream", () => {
    it("should throw ParseError with an invalid connection string", async () => {
        try {
            addon.createClient('invalid://localhost:2113?tls=false');
        } catch (error) {
            assert.strictEqual(error.name, "ParseError");
        }
    });

    it("should throw UnavailableError when connecting to a non-existent server", async () => {
        try {
            const client = addon.createClient('esdb://localhost:2119?tls=false');
            await client.readStream("non_existent_stream");
        } catch (error) {
            assert.strictEqual(error.name, "UnavailableError");
        }
    });

    it("should return ResourceNotFound on non-existent stream", async () => {
        const client = addon.createClient('esdb://localhost:2113?tls=false');
        const stream = await client.readStream("non_existent_stream");

        try {
            for await (const resolved of stream) {
                // do nothing
            }
        } catch (error) {
            assert.strictEqual(error.name, "StreamNotFound");
        }
    });
})