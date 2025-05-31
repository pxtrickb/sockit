"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkDeps;
const exec_1 = require("./exec");
const logger_1 = require("./logger");
const logger_2 = require("./logger");
async function checkDeps(packageName) {
    (0, logger_2.LogInfo)(`Checking dep ${packageName}...`);
    const hasPackage = await (0, exec_1.execAsync)(`npm list ${packageName}`);
    if (!hasPackage) {
        (0, logger_2.LogInfo)(`Installing dep ${packageName}...`);
        const installPackage = await (0, exec_1.execAsync)(`npm install ${packageName}`);
        if (!installPackage) {
            (0, logger_1.LogError)(`Failed to install dep ${packageName}`);
            return;
        }
        (0, logger_2.LogInfo)(`Successfully installed dep ${packageName}`);
    }
    else {
        (0, logger_2.LogInfo)(`Dep ${packageName} is already installed`);
    }
}
