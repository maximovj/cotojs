import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import configJwt from './config/configJWT.js';
import configCors from './config/configCors.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import mainRoute from './routes/mainRoute.js';
dotenv.config();
const app = express();

// Establecer variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 3000);
app.set('url', process.env.APP_URL || 'http://localhost');
app.set('env', process.env.APP_ENV || 'local');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(configCors);

// Definir EndPoints
app.use('/api/v1/main', mainRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', configJwt, userRoute);

export default app;