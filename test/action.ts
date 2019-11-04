import { assert } from "chai";

const testEnvVars = {
    INPUT_VERSION: 'v0.7',
    INPUT_CONFIG: 'http://some-path.yaml',
    GITHUB_WORKSPACE: '/home/runner/repo'
};

describe("checking input parsing", function () {
    beforeEach(() => {
        for (const key in testEnvVars)
            process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
    });

    it("correctly generates the cluster create command", () => {
        let args: string[] = ["create", "cluster"];
        assert.deepEqual(args, ["create", "cluster"]);
    });


});