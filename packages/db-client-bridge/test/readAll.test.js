"use strict";

const assert = require("assert");

const addon = require("../lib");
const {describe, it} = require("node:test");

describe("readAll", () => {
    it("should throw UnavailableError when connecting to a non-existent server", async () => {
        try {
            const client = addon.createClient('esdb://localhost:2119?tls=false');
            await client.readAll();
        } catch (error) {
            assert.strictEqual(error.name, "UnavailableError");
        }
    });
})