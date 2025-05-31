"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exec;
exports.execAsync = execAsync;
const child_process_1 = require("child_process");
const logger_1 = require("./logger");
function log(error, command) {
    (0, logger_1.LogError)(`Failed to execute command: ${command}`);
    (0, logger_1.LogError)(`==== ${error.name} ====`);
    (0, logger_1.LogError)(error.message);
    // LogError((error as Error).stack || '');
    (0, logger_1.LogError)(`==================================`);
    return null;
}
function exec(command) {
    try {
        const result = (0, child_process_1.execSync)(command);
        return result.toString();
    }
    catch (error) {
        log(error, command);
        return null;
    }
}
async function execAsync(command) {
    try {
        const result = await exec(command);
        return result;
    }
    catch (error) {
        log(error, command);
        return null;
    }
}
