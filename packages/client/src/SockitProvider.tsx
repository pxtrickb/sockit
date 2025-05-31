'use client';
import React, { createContext, useContext, useMemo, useEffect, useState, ReactNode } from 'react';
import { getSocket } from './socket';
import type { Socket } from 'socket.io-client';

interface SockitContextValue {
    socket: Socket;
    connected: boolean;
}

export const SockitContext = createContext<SockitContextValue | undefined>(undefined);

export function SockitProvider({ children }: { children: ReactNode }) {
    const socket = getSocket();
    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {
        const handleConnect = () => setConnected(true);
        const handleDisconnect = () => setConnected(false);
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket]);

    const value = useMemo(() => ({ socket, connected }), [socket, connected]);

    return (
        <SockitContext.Provider value={value}>
            {children}
        </SockitContext.Provider>
    );
}

export default SockitProvider;
