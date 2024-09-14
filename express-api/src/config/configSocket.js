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
        origin: process.env.CLIENT_URL_1 || process.env.CLIENT_URL_2 || 'http://localhost:3000',
    }
};

export default configSocket;