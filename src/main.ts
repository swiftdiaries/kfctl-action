import * as core from '@actions/core';
import {KubeflowConfig, getKubeflowConfig, downloadKFConfig, installKubeflow, downloadKfctl} from './kind-kf';

async function run() {
  try {
    let cfg: KubeflowConfig = getKubeflowConfig();
    //await downloadKFConfig(cfg.version);
    await downloadKfctl(cfg.version);
    await installKubeflow(cfg.configFile);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
