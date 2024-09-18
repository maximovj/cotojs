import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import setupSocketIO from './socket/setupSocketIO.js';
import configSession from './config/configSession.js';
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
app.use(configSession);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Middleware para Manejar la Inactividad
app.use((req, res, next) => {
    if (req.session) {
        if (req.session.lastActivity && Date.now() - req.session.lastActivity > 30 * 60 * 1000) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ message: 'Error al destruir la sesión' });
                }
                return res.status(401).json({ message: 'Sesión expirada por inactividad' });
            });
        } else {
            req.session.lastActivity = Date.now();
            next();
        }
    } else {
        next();
    }
});

// Definir EndPoints
app.use('/api/v1/storage', express.static('storage'));
app.use('/api/v1/main', configCors, mainRoute);
app.use('/api/v1/auth', configCors, authRoute);
app.use('/api/v1/static', configCors, staticRoute);
app.use('/api/v1/user', configCors, configJwt, userRoute);
app.use('/api/v1/room', configCors, configJwt, roomRoute);
app.use('/api/v1/message', configCors, configJwt, messageRoute);

const server = http.createServer(app);

const io = setupSocketIO(server);

export { server, app };