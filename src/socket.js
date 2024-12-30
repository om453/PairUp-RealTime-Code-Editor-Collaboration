import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket', 'polling'],
        secure: true,
    };
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const wsUrl = BACKEND_URL.replace(/^http/, 'ws').replace(/^https/, 'wss');
    return io(wsUrl, options);
};