import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';

const VersionInput: string = "version";
const ConfigInput: string = "config";

export class KubeflowConfig {
    version: string
    configFile: string;
    constructor(version: string, configFile: string) {
        this.version = version;
        this.configFile = configFile;
    }

}

export function getKubeflowConfig(): KubeflowConfig {
    const v: string = core.getInput(VersionInput);
    const c: string = core.getInput(ConfigInput);
    return new KubeflowConfig(v, c)
}

export async function buildkfctl(version: string) {
    const kfctlPath: string = "/home/runner/bin";
    await io.mkdirP(kfctlPath);

    core.addPath(kfctlPath);
}

// TODO(swiftdiaries): set kubeflow version in download URL
export async function downloadKfctl(version: string) {
    const kfctlPath: string = "/home/runner/bin";
    let kfConfigUrl: string = `https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_k8s_istio.yaml`;
    await io.mkdirP(kfctlPath);
    console.log("making directory at: " + kfctlPath);

    let kfctlUrl: string = `https://github.com/kubeflow/kubeflow/releases/download/v0.7.0/kfctl_v0.7.0_linux.tar.gz`;
    console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");
    await exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl.tar.gz"), kfctlUrl]);
    await exec.exec("tar", ["-zxvf", path.join(kfctlPath, "kfctl.tar.gz"), "-C", kfctlPath]);
    console.log("The kfctl directory contains: ");
    await exec.exec("ls", [kfctlPath]);
    await exec.exec("chmod", ["+x", path.join(kfctlPath, "kfctl")]);
    await exec.exec(path.join(kfctlPath, "kfctl"), ["apply", "-V", "-f", kfConfigUrl]);
    core.addPath(kfctlPath);
}

export async function installKubeflow(config: string) {

}