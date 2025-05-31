import { Socket } from 'socket.io-client';
import { CRUDResponse } from '@sockit/types';
interface UseSockit {
    emit: (eventKey: string, data: any, callback?: (response: CRUDResponse) => void) => void;
    on: (eventKey: string, cb: (data: any) => void) => void;
    subscribe: (resource: string, data: any, callback: (action: string, data: any) => void) => void;
    unsubscribe: (resource: string) => void;
    socket: Socket;
    connected: boolean;
}
export default function useSockit(): UseSockit;
export {};
//# sourceMappingURL=useSockit.d.ts.map