import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';

const VersionInput: string = "version";
const ConfigInput: string = "config";
const kfctlPath: string = "/home/runner/bin";
const kfctlUrl: string = `https://github.com/kubeflow/kubeflow/releases/download/`;

export class KubeflowConfig {
    version: string
    configFile: string;
    constructor(version: string, configFile: string) {
        this.version = version;
        if (this.version == "") {
            this.version = "v0.7.0"
        }
        this.configFile = configFile;
    }

}

export function getKubeflowConfig(): KubeflowConfig {
    const v: string = core.getInput(VersionInput);
    const c: string = core.getInput(ConfigInput);
    return new KubeflowConfig(v, c)
}

// TODO(swiftdiaries): set kubeflow version in download URL
export async function downloadKfctl(version: string) {
    await io.mkdirP(kfctlPath);
    console.log("making directory at: " + kfctlPath);
    console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");
    var kfctlVersionedUrl = kfctlUrl + version + `/kfctl_` + version + `_linux.tar.gz`;
    await exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl.tar.gz"), kfctlVersionedUrl]);
    await exec.exec("tar", ["-zxvf", path.join(kfctlPath, "kfctl.tar.gz"), "-C", kfctlPath]);
    console.log("The kfctl directory contains: ");
    await exec.exec("ls", [kfctlPath]);
    await exec.exec("chmod", ["+x", path.join(kfctlPath, "kfctl")]);

    core.addPath("/home/.kube")
    core.addPath(kfctlPath);
}

export async function installKubeflow(config: string) {
    await exec.exec(path.join(kfctlPath, "kfctl"), ["apply", "-V", "-f", path.join(kfctlPath, "kfctl_k8s_istio.yaml")]);
}

export async function downloadKfConfig(version: string) {
    const kfConfigUrl: string = "https://raw.githubusercontent.com/kubeflow/manifests/v0.7-branch/kfdef/kfctl_k8s_istio.0.7.0.yaml";
    await exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl_k8s_istio.yaml"), kfConfigUrl]);
    await exec.exec("cat", [path.join(kfctlPath, "kfctl_k8s_istio.yaml")]);
}
