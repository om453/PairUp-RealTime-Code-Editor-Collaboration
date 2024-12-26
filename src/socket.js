import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 20000,
        transports: ['websocket', 'polling'],
        secure: true,
        autoConnect: true,
        rejectUnauthorized: false
    };
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    return io(BACKEND_URL, options);
};