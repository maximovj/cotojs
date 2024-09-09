import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Configurar cors
const envKeys = Object.keys(process.env);
const envKeysCors = envKeys.filter(_env => _env.startsWith('APP_CORS_'));
const corsAllowed = envKeysCors.map(_env => process.env[_env]);

const configCors = cors({
    methods: ['get', 'post', 'put', 'delete'],
    allowedHeaders: ['origin', 'accept', 'authorization', 'cache-control', 'content-type', 'accept-encoding', 'referer', 'user-agent', 'host', 'connection', 'content-length'],
    credentials: true,
    optionsSuccessStatus: 200,
    origin: function (origin, callback) {
        let headers_origin = origin || null;
        if (!headers_origin || corsAllowed.indexOf(headers_origin) === -1) {
            callback('!!! CORS Denegado !!!', false);
        }
        callback(null, true);
        console.log('CORS Aceptado:', origin);
    }
});

export default configCors;