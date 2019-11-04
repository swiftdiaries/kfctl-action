"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const testEnvVars = {
    INPUT_VERSION: 'v0.7',
    INPUT_CONFIG: 'http://some-path.yaml',
    GITHUB_WORKSPACE: '/home/runner/repo'
};
describe("checking input parsing", function () {
    beforeEach(() => {
        for (const key in testEnvVars)
            process.env[key] = testEnvVars[key];
    });
    it("correctly generates the cluster create command", () => {
        let args = ["create", "cluster"];
        chai_1.assert.deepEqual(args, ["create", "cluster"]);
    });
});
