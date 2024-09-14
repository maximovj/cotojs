import io from 'socket.io-client';

const socketService = io('http://localhost:3099', {
    host: 'http://localhost',
    port: 3099,
    path: '/api/v1/socket.io',
    transports: ['websocket'],
    withCredentials: true,
});

export default socketService;