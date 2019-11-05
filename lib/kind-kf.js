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
const tc = __importStar(require("@actions/tool-cache"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
const path = __importStar(require("path"));
const VersionInput = "version";
const ConfigInput = "config";
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
function buildkfctl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const kfctlPath = "/home/runner/bin";
        yield io.mkdirP(kfctlPath);
        core.addPath(kfctlPath);
    });
}
exports.buildkfctl = buildkfctl;
// TODO(swiftdiaries): set kubeflow version in download URL
function downloadKfctl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const kfctlPath = "/home/runner/bin";
        yield io.mkdirP(kfctlPath);
        console.log("making directory at: " + kfctlPath);
        let kfctlUrl = `https://github.com/kubeflow/kubeflow/releases/download/v0.7.0/kfctl_v0.7.0_linux.tar.gz`;
        let downloadPath = null;
        downloadPath = yield tc.downloadTool(kfctlUrl);
        console.log("downloading kfctl from: " + kfctlUrl);
        console.log("Things inside the directory: ");
        yield exec.exec("ls", [downloadPath]);
        let extractedFolder = null;
        extractedFolder = yield tc.extractTar(downloadPath, kfctlPath);
        yield io.mv(extractedFolder, kfctlPath);
        console.log("extracting kfctl tarball to: " + kfctlPath + "/kfctl");
        core.addPath(kfctlPath);
    });
}
exports.downloadKfctl = downloadKfctl;
function installKubeflow(config) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.installKubeflow = installKubeflow;
function downloadKFConfig(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_k8s_istio.yaml`;
        console.log("downloading KFConfig from " + url);
        let downloadPath = null;
        downloadPath = yield tc.downloadTool(url);
        const kfconfigPath = "/home/runner/bin";
        yield io.mkdirP(kfconfigPath);
        yield exec.exec("chmod", ["+x", downloadPath]);
        yield io.mv(downloadPath, path.join(kfconfigPath, "kfctl_k8s_istio.yaml"));
        core.addPath(kfconfigPath);
    });
}
exports.downloadKFConfig = downloadKFConfig;
