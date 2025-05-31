"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SockitContext = void 0;
exports.SockitProvider = SockitProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const socket_1 = require("./socket");
exports.SockitContext = (0, react_1.createContext)(undefined);
function SockitProvider({ children }) {
    const socket = (0, socket_1.getSocket)();
    const [connected, setConnected] = (0, react_1.useState)(socket.connected);
    (0, react_1.useEffect)(() => {
        const handleConnect = () => setConnected(true);
        const handleDisconnect = () => setConnected(false);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);
    const value = (0, react_1.useMemo)(() => ({ socket, connected }), [socket, connected]);
    return ((0, jsx_runtime_1.jsx)(exports.SockitContext.Provider, { value: value, children: children }));
}
exports.default = SockitProvider;
