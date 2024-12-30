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
    
    const BACKEND_URL = 'https://pairup-backend.onrender.com';
        
    return io(BACKEND_URL, options);
};