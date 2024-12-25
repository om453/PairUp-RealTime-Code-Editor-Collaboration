import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
        withCredentials: true
    };
    
    console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
    
    const socket = io(import.meta.env.VITE_BACKEND_URL, options);
    
    return new Promise((resolve, reject) => {
        socket.on('connect', () => {
            console.log('Socket connected successfully');
            resolve(socket);
        });
        
        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            reject(error);
        });
    });
};