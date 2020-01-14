import "mocha";
import { assert } from "chai";
import { KubeflowConfig, getKubeflowConfig } from "../src/kind-kf";

const testEnvVars = {
    INPUT_VERSION: 'v0.7.0',
    INPUT_CONFIG: 'https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_k8s_istio.0.7.0.yaml',
    GITHUB_WORKSPACE: '/home/runner/'
};

describe("checking input parsing", function () {
    beforeEach(() => {
        for (const key in testEnvVars)
            process.env[key] = testEnvVars[key as keyof typeof testEnvVars]
    });

    it("correctly parse input", () => {
        let cfg: KubeflowConfig = getKubeflowConfig();
        assert.equal(cfg.version, testEnvVars.INPUT_VERSION);
        assert.equal(cfg.configFile, testEnvVars.INPUT_CONFIG);
    });

    // it("correctly downloadKFConfig", () => {
    //     let cfg: KubeflowConfig = getKubeflowConfig();
    //     assert.deepEqual()
    // });
});
