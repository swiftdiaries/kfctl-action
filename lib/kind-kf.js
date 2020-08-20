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
const path = __importStar(require("path"));
const VersionInput = "version";
const ConfigInput = "config";
const toolName = "kfctl";
class KubeflowConfig {
    constructor(version, configFile) {
        this.version = version;
        this.configFile = configFile;
    }
    assembleCommand() {
        let args = ["apply", "-V",];
        if (this.configFile != "") {
            const wd = process.env[`GITHUB_WORKSPACE`] || "";
            const absPath = path.join(wd, this.configFile);
            args.push("-f", absPath);
        }
        return args;
    }
    deployKubeflow() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Executing kfctl with config file: " + this.configFile);
            yield exec.exec("kfctl", this.assembleCommand());
        });
    }
}
exports.KubeflowConfig = KubeflowConfig;
function getKubeflowConfig() {
    const v = core.getInput(VersionInput);
    const c = core.getInput(ConfigInput);
    return new KubeflowConfig(v, c);
}
exports.getKubeflowConfig = getKubeflowConfig;
// downloads kfctl and places it in the path
function downloadKfctl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const kfctlPath = yield tc.downloadTool(`https://github.com/kubeflow/kfctl/releases/download/${version}/kfctl_${version}-0-g9a3621e_linux.tar.gz`);
        const kfctlExtractedFolder = yield tc.extractTar(kfctlPath, 'bin');
        yield exec.exec("chmod", ["+x", kfctlExtractedFolder]);
        const cachedPath = yield tc.cacheFile(kfctlExtractedFolder, "kfctl", toolName, version);
        core.debug(`kfctl is cached under ${cachedPath}`);
        return cachedPath;
    });
}
exports.downloadKfctl = downloadKfctl;
function getKfctl(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let toolPath = tc.find(toolName, version);
        if (toolPath === "") {
            toolPath = yield downloadKfctl(version);
        }
        return toolPath;
    });
}
exports.getKfctl = getKfctl;
