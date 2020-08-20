import * as core from '@actions/core'
import {KubeflowConfig, getKubeflowConfig, getKfctl} from './kind-kf'

async function run() {
  try {
    const cfg: KubeflowConfig = getKubeflowConfig();
    let toolPath: string = await getKfctl(cfg.version);
    core.addPath(toolPath);
    await cfg.deployKubeflow();
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
