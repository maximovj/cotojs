import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import setupSocketIO from './socket/setupSocketIO.js';
import configJwt from './config/configJWT.js';
import configCors from './config/configCors.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import mainRoute from './routes/mainRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import roomRoute from './routes/roomRoute.js';
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
app.use('/api/v1/room', configJwt, roomRoute);
app.use('/api/v1/message', configJwt, messageRoute);

const server = http.createServer(app);

const io = setupSocketIO(server);

export { server, app };