"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInfo = LogInfo;
exports.LogError = LogError;
exports.FatalError = FatalError;
exports.LogWarning = LogWarning;
exports.LogSuccess = LogSuccess;
const chalk_1 = __importDefault(require("chalk"));
function LogInfo(message) {
    console.log(chalk_1.default.blueBright('[SocKit]'), message);
}
function LogError(message) {
    console.log(chalk_1.default.redBright('[SocKit]'), message);
}
function FatalError(message) {
    console.log(chalk_1.default.redBright('[SocKit] =================================================================='));
    console.log(chalk_1.default.redBright('[SocKit] SocKit has encountered a fatal error. The server has been stopped.'));
    console.log(chalk_1.default.redBright('[SocKit] =================================================================='));
    console.log(chalk_1.default.redBright('[SocKit]'), message);
    console.log(chalk_1.default.redBright('[SocKit] =================================================================='));
    process.exit(1);
}
function LogWarning(message) {
    console.log(chalk_1.default.yellowBright('[SocKit]'), message);
}
function LogSuccess(message) {
    console.log(chalk_1.default.greenBright('[SocKit]'), message);
}
