import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
        secure: true,
        rejectUnauthorized: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        autoConnect: true
    };
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        
    return io(BACKEND_URL, options);
};