'use client';
import { useContext, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { SockitContext } from './SockitProvider';
import { CRUDResponse } from '@sockit/types';

// Type for CRUDResponse (should be imported from @sockit/types in real usage)

interface UseSockit {
    emit: (eventKey: string, data: any, callback?: (response: CRUDResponse) => void) => void;
    on: (eventKey: string, cb: (data: any) => void) => void;
    subscribe: (resource: string, data: any, callback: (action: string, data: any) => void) => void;
    unsubscribe: (resource: string) => void;
    socket: Socket;
    connected: boolean;
}

export default function useSockit(): UseSockit {
    const context = useContext(SockitContext);
    if (!context) {
        throw new Error('useSockit must be used within a SockitProvider');
    }
    const { socket, connected } = context;

    /**
     * Emits a socket event with the given event key and data. Optionally invokes a callback with the server response.
     * @param {string} eventKey - The event name to emit.
     * @param {any} data - The data to send with the event.
     * @param {(response: CRUDResponse) => void} [callback] - Optional callback to handle the response.
     */
    const emit = useCallback((eventKey: string, data: any, callback?: (response: CRUDResponse) => void) => {
        if (callback) {
            socket.emit(eventKey, data, callback);
        } else {
            socket.emit(eventKey, data);
        }
    }, [socket]);

    /**
     * Registers a handler for a socket event.
     * @param {string} eventKey - The event name to listen for.
     * @param {(data: any) => void} cb - The callback to invoke when the event is received.
     */
    const on = useCallback((eventKey: string, cb: (data: any) => void) => {
        socket.on(eventKey, cb);
        return () => socket.off(eventKey, cb);
    }, [socket]);

    /**
     * Subscribes to a resource and registers a callback for announcements.
     * @param {string} resource - The resource to subscribe to.
     * @param {any} data - The data to send with the subscription request.
     * @param {(action: string, data: any) => void} callback - Callback for subscription announcements.
     */
    const subscribe = useCallback((resource: string, data: any, callback: (action: string, data: any) => void) => {
        // Listen for announce events for this resource
        const announceEvent = `${resource}:announce`;
        socket.on(announceEvent, (payload: { action: string; data: any }) => {
            callback(payload.action, payload.data);
        });
        // Emit subscribe event
        socket.emit(`${resource}:subscribe`, data);
        // Return unsubscribe function
        return () => socket.off(announceEvent, callback);
    }, [socket]);

    /**
     * Unsubscribes from a resource.
     * @param {string} resource - The resource to unsubscribe from.
     */
    const unsubscribe = useCallback((resource: string) => {
        socket.emit(`${resource}:unsubscribe`);
        // Optionally remove all listeners for this resource's announce event
        socket.removeAllListeners(`${resource}:announce`);
    }, [socket]);

    return { emit, on, subscribe, unsubscribe, socket, connected };
}
