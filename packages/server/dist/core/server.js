"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const config_1 = require("../config");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const logger_1 = require("../utils/logger");
function startServer() {
    const config = (0, config_1.getConfig)();
    // Create HTTP server
    const httpServer = http_1.default.createServer();
    // Setup socket.io server attached to HTTP server
    const io = new socket_io_1.Server(httpServer, {
        cors: config.cors
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
    });
    io.on('disconnect', (socket) => {
        console.log('A user disconnected:', socket.id);
    });
    // Listen on the configured port
    httpServer.listen(config.port, () => {
        (0, logger_1.LogSuccess)(`SocKit server is running on ${config.url}:${config.port}`);
    });
}
