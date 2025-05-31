import React, { ReactNode } from 'react';
import type { Socket } from 'socket.io-client';
interface SockitContextValue {
    socket: Socket;
    connected: boolean;
}
export declare const SockitContext: React.Context<SockitContextValue | undefined>;
export declare function SockitProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default SockitProvider;
//# sourceMappingURL=SockitProvider.d.ts.map