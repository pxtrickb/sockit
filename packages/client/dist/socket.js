"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = getSocket;
const socket_io_client_1 = require("socket.io-client");
// Determine base URL
const BASE_URL = process.env.NEXT_PUBLIC_SOCKIT_URL ||
    (typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.hostname}`
        : 'http://localhost');
// Determine port
const PORT = process.env.NEXT_PUBLIC_SOCKIT_PORT || '3333';
// Compose full socket URL
const SOCKET_URL = `${BASE_URL}:${PORT}`;
let socket = null;
function getSocket() {
    if (!socket) {
        socket = (0, socket_io_client_1.io)(SOCKET_URL, {
            autoConnect: true,
            reconnection: true,
            transports: ['websocket'],
        });
    }
    return socket;
}
