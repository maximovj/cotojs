import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const APP_KEY_SECRET = process.env.APP_SECRET_KEY || 'ZYfrS_F_UXy*ALB37)*4';
const NODE_ENV = process.env.NODE_ENV || 'development';

const configSession = session({
    secret: APP_KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 60 * 60 * 1000, // 1hora en milisegundos
    }
});

export default configSession;