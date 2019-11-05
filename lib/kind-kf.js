"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
const path = __importStar(require("path"));
const VersionInput = "version";
const ConfigInput = "config";
const kfctlPath = "/home/runner/bin";
const kfctlUrl = `https://github.com/kubeflow/kubeflow/releases/download/v0.7.0/kfctl_v0.7.0_linux.tar.gz`;
const kfConfigUrl = `https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_k8s_istio.yaml`;
class KubeflowConfig {
    constructor(version, configFile) {
        this.version = version;
        this.configFile = configFile;
    }
}
exports.KubeflowConfig = KubeflowConfig;
function getKubeflowConfig() {
    const v = core.getInput(VersionInput);
    const c = core.getInput(ConfigInput);
    return new KubeflowConfig(v, c);
}
exports.getKubeflowConfig = getKubeflowConfig;
// TODO(swiftdiaries): set kubeflow version in download URL
function downloadKfctl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        yield io.mkdirP(kfctlPath);
        console.log("making directory at: " + kfctlPath);
        console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");
        yield exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl.tar.gz"), kfctlUrl]);
        yield exec.exec("tar", ["-zxvf", path.join(kfctlPath, "kfctl.tar.gz"), "-C", kfctlPath]);
        console.log("The kfctl directory contains: ");
        yield exec.exec("ls", [kfctlPath]);
        yield exec.exec("chmod", ["+x", path.join(kfctlPath, "kfctl")]);
        core.addPath(kfctlPath);
    });
}
exports.downloadKfctl = downloadKfctl;
function installKubeflow(config) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec(path.join(kfctlPath, "kfctl"), ["apply", "-V", "-f", path.join(kfctlPath, "kfctl_k8s_istio.yaml")]);
    });
}
exports.installKubeflow = installKubeflow;
function downloadKfConfig(version) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec.exec("wget", ["-O", path.join(kfctlPath, "kfctl_k8s_istio.yaml"), kfConfigUrl]);
    });
}
exports.downloadKfConfig = downloadKfConfig;
function checkCluster() {
    return __awaiter(this, void 0, void 0, function* () {
        let getKubeConfigCmd = "$(kind get kubeconfig-path)";
        yield exec.exec("export", ["KUBECONFIG=" + getKubeConfigCmd]);
        yield exec.exec("kubectl", ["get", "no"]);
    });
}
exports.checkCluster = checkCluster;
