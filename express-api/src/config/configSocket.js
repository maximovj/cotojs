import dotenv from 'dotenv';
dotenv.config();

const configSocket = {
    path: '/api/v1/socket.io',
    cookie: true,
    transports: ['polling', 'websocket'],
    cors: {
        methods: ['get', 'post', 'put', 'delete'],
        allowedHeaders: ['origin', 'accept', 'authorization', 'cache-control', 'content-type', 'accept-encoding', 'referer', 'user-agent', 'host', 'connection', 'content-length'],
        credentials: true,
        optionsSuccessStatus: 200,
        origin: process.env.APP_CLIENT_SOCKET_IO || 'http://localhost:5173',
    }
};

export default configSocket;