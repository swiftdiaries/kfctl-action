import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';

const VersionInput: string = "version";
const ConfigInput: string = "config";

const toolName: string = "kfctl";

export class KubeflowConfig {
  configFile: string;
  version: string;

  constructor(version: string, configFile: string) {
    this.version = version;
    this.configFile = configFile;
  }

  assembleCommand(): string[] {
    let args: string[] = ["apply", "-V",];
    if (this.configFile != "") {
      const wd: string = process.env[`GITHUB_WORKSPACE`] || "";
      const absPath: string = path.join(wd, this.configFile);
      args.push("-f", absPath);
    }

    return args;
  }

  async deployKubeflow() {
    console.log("Executing kfctl with config file: " + this.configFile);
    await exec.exec("kfctl", this.assembleCommand());
  }
}

export function getKubeflowConfig(): KubeflowConfig {
  const v: string = core.getInput(VersionInput);
  const c: string = core.getInput(ConfigInput);

  return new KubeflowConfig(v, c);
}

// downloads kfctl and places it in the path
export async function downloadKfctl(version: string): Promise<string> {
  const kfctlPath = await tc.downloadTool(`https://github.com/kubeflow/kfctl/releases/download/${version}/kfctl_${version}-0-g9a3621e_linux.tar.gz`);
  const kfctlExtractedFolder = await tc.extractTar(kfctlPath, 'bin');
  
  await exec.exec("chmod", ["+x", kfctlExtractedFolder]);
  
  const cachedPath = await tc.cacheFile(kfctlExtractedFolder, "kfctl", toolName, version);
  core.debug(`kfctl is cached under ${cachedPath}`);

  return cachedPath;
}

export async function getKfctl(version: string): Promise<string> {
  let toolPath: string = tc.find(toolName, version)

  if (toolPath === "") {
    toolPath = await downloadKfctl(version);
  }

  return toolPath
}