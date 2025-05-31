import { getConfig } from "../config";
import { Server } from "socket.io";
import http from "http";
import { LogSuccess } from "../utils/logger";

export function startServer() {
    const config = getConfig();

    // Create HTTP server
    const httpServer = http.createServer();

    // Setup socket.io server attached to HTTP server
    const io = new Server(httpServer, {
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
        LogSuccess(`SocKit server is running on ${config.url}:${config.port}`);
    });
}