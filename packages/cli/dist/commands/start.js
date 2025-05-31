"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStartCommand = registerStartCommand;
const logger_1 = require("../utils/logger");
const server_1 = require("@sockit/server");
function registerStartCommand(program) {
    program
        .command('start')
        .description('Start the SocKit server')
        .action(async () => {
        (0, logger_1.LogInfo)('Starting SocKit server...');
        (0, server_1.start)();
    });
}
