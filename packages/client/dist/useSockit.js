"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSockit;
const react_1 = require("react");
const SockitProvider_1 = require("./SockitProvider");
function useSockit() {
    const context = (0, react_1.useContext)(SockitProvider_1.SockitContext);
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
    const emit = (0, react_1.useCallback)((eventKey, data, callback) => {
        if (callback) {
            socket.emit(eventKey, data, callback);
        }
        else {
            socket.emit(eventKey, data);
        }
    }, [socket]);
    /**
     * Registers a handler for a socket event.
     * @param {string} eventKey - The event name to listen for.
     * @param {(data: any) => void} cb - The callback to invoke when the event is received.
     */
    const on = (0, react_1.useCallback)((eventKey, cb) => {
        socket.on(eventKey, cb);
        return () => socket.off(eventKey, cb);
    }, [socket]);
    /**
     * Subscribes to a resource and registers a callback for announcements.
     * @param {string} resource - The resource to subscribe to.
     * @param {any} data - The data to send with the subscription request.
     * @param {(action: string, data: any) => void} callback - Callback for subscription announcements.
     */
    const subscribe = (0, react_1.useCallback)((resource, data, callback) => {
        // Listen for announce events for this resource
        const announceEvent = `${resource}:announce`;
        socket.on(announceEvent, (payload) => {
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
    const unsubscribe = (0, react_1.useCallback)((resource) => {
        socket.emit(`${resource}:unsubscribe`);
        // Optionally remove all listeners for this resource's announce event
        socket.removeAllListeners(`${resource}:announce`);
    }, [socket]);
    return { emit, on, subscribe, unsubscribe, socket, connected };
}
