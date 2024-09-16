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
import staticRoute from './routes/staticRoute.js';
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

// Definir EndPoints
app.use('/api/v1/public', express.static('static'));
app.use('/api/v1/main', configCors, mainRoute);
app.use('/api/v1/auth', configCors, authRoute);
app.use('/api/v1/static', configCors, staticRoute);
app.use('/api/v1/user', configCors, configJwt, userRoute);
app.use('/api/v1/room', configCors, configJwt, roomRoute);
app.use('/api/v1/message', configCors, configJwt, messageRoute);

const server = http.createServer(app);

const io = setupSocketIO(server);

export { server, app };