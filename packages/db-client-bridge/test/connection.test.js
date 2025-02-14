"use strict";

const assert = require("assert");

const addon = require("../lib");
const {describe, it} = require("node:test");

describe("connection", () => {
    it("should throw ParseError with an invalid connection string", async () => {
        try {
            addon.createClient('invalid://localhost:2113?tls=false');
        } catch (error) {
            assert.strictEqual(error.name, "ParseError");
        }
    });
})
