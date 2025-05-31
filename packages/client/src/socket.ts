import { io, Socket } from 'socket.io-client';

// Determine base URL
const BASE_URL =
    process.env.NEXT_PUBLIC_SOCKIT_URL ||
    (typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.hostname}`
        : 'http://localhost');

// Determine port
const PORT = process.env.NEXT_PUBLIC_SOCKIT_PORT || '3333';

// Compose full socket URL
const SOCKET_URL = `${BASE_URL}:${PORT}`;

let socket: Socket | null = null;

export function getSocket(): Socket {
    if (!socket) {
        socket = io(SOCKET_URL, {
            autoConnect: true,
            reconnection: true,
            transports: ['websocket'],
        });
    }
    return socket;
}
