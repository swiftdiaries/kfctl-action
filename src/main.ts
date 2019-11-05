import * as core from '@actions/core';
import {KubeflowConfig, getKubeflowConfig, installKubeflow, downloadKfctl} from './kind-kf';

async function run() {
  try {
    let cfg: KubeflowConfig = getKubeflowConfig();
    await downloadKfctl(cfg.version);
    await installKubeflow(cfg.configFile);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
