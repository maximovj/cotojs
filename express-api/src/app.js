import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { Server as SocketIO } from 'socket.io';
import http from 'http';
import configJwt from './config/configJWT.js';
import configCors from './config/configCors.js';
import configCorsIO from './config/configCorsIO.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import mainRoute from './routes/mainRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

// Establecer variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 3000);
app.set('url', process.env.APP_URL || 'http://localhost');
app.set('env', process.env.APP_ENV || 'local');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(configCors);

// Definir EndPoints
app.use('/api/v1/main', mainRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', configJwt, userRoute);

// Crear un servidor
const server = http.createServer(app);

// Iniciar socket 
const io = new SocketIO(server, {
    path: '/api/v1/socket.io',
    cookie: true,
    transports: ['polling', 'websocket'],
    cors: {
        credentials: true,
        methods: ['POST', 'GET'],
        optionsSuccessStatus: 200,
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Escuchar mensajes enviados por el cliente
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Emitir el mensaje a todos los clientes conectados
    });

    /*
    socket.on('sendMessage', (data) => {
        console.log('Mensaje recibido:', data);
        io.emit('receiveMessage', data);
    });
    */

    // Unirse a una sala
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} se unió a la sala ${room}`);
    });

    // Enviar mensaje a una sala
    socket.on('sendMessage', ({ room, message }) => {
        io.to(room).emit('receiveMessage', message);
    });

    // Salir de una sala
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`${socket.id} salió de la sala ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
});

export { server, app };