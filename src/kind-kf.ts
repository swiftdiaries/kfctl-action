import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';

const VersionInput: string = "version";
const ConfigInput: string = "config";
const kfctlPath: string = "/home/runner/bin";
const kfctlUrl: string = `https://github.com/kubeflow/kubeflow/releases/download/v0.7.0/kfctl_v0.7.0_linux.tar.gz`;
const kfConfigUrl: string = `https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_k8s_istio.yaml`;

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

// TODO(swiftdiaries): set kubeflow version in download URL
export async function downloadKfctl(version: string) {
<<<<<<< HEAD
    const kfctlPath: string = "/home/runner/bin";
    console.log("making directory at: " + kfctlPath);
    await io.mkdirP(kfctlPath);

    let kfctlUrl: string = `https://github.com/kubeflow/kubeflow/releases/download/v0.7.0/kfctl_v0.7.0_linux.tar.gz`;
    console.log("downloading kfctl from: " + kfctlUrl);
    const downloadPath = await tc.downloadTool(kfctlUrl);
    await exec.exec("chmod", ["+x", downloadPath]);
    await exec.exec("ls", [kfctlPath])
    await io.mv(downloadPath, path.join(kfctlPath, "kfctl_v0.7.0_linux.tar.gz"));

    const extractedFolder = await tc.extractTar(path.join(kfctlPath, "kfctl_v0.7.0_linux.tar.gz"), kfctlPath);
    await io.mv(extractedFolder, kfctlPath);
    console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");

=======
    await io.mkdirP(kfctlPath);
    console.log("making directory at: " + kfctlPath);

    console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");
    await exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl.tar.gz"), kfctlUrl]);
    await exec.exec("tar", ["-zxvf", path.join(kfctlPath, "kfctl.tar.gz"), "-C", kfctlPath]);
    console.log("The kfctl directory contains: ");
    await exec.exec("ls", [kfctlPath]);
    await exec.exec("chmod", ["+x", path.join(kfctlPath, "kfctl")]);

    core.addPath("/home/.kube")
>>>>>>> releases/v1
    core.addPath(kfctlPath);
}

export async function installKubeflow(config: string) {
    await exec.exec(path.join(kfctlPath, "kfctl"), ["apply", "-V", "-f", path.join(kfctlPath, "kfctl_k8s_istio.yaml")]);
}

<<<<<<< HEAD
export async function downloadKFConfig(version: string) {
    let url: string = `https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_k8s_istio.yaml`;
    console.log("downloading KFConfig from " + url);
    
    let downloadPath: string | null = null;
    downloadPath = await tc.downloadTool(url);
    
    const kfconfigPath: string = "/home/runner/config";
    await io.mkdirP(kfconfigPath);
    await exec.exec("chmod", ["+x", downloadPath]);
    await io.mv(downloadPath, path.join(kfconfigPath, "kfctl_k8s_istio.yaml"));
    await exec.exec("cat", [kfconfigPath, "kfctl_k8s_istio.yaml"])
    await exec.exec("ls", [kfconfigPath])
    const cachePath = await tc.cacheDir(kfconfigPath, 'kfconfig', 'master');
    core.addPath(cachePath);
=======
export async function downloadKfConfig(version: string) {
    await exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl_k8s_istio.yaml"), kfConfigUrl]);
>>>>>>> releases/v1
}
