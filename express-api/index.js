import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
dotenv.config();
const app = express();

// Configurar la base de datos
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/db-cotojs', {});


conn.on('connected', () => {
    console.log('Base de datos conectado exitosamente.');
});

conn.on('disconnected', () => {
    console.log('Base de datos desconectado exitosamente.');
});

conn.on('error', () => {
    console.log('Error en la conexión de mongodb');
});

const User = conn.model('users', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const createUser = async () => {
    try {
        const user = new User({
            name: 'Nick Example',
            email: 'nick@example.com'
        });

        const saveUser = await user.save();
        console.log(saveUser);
    } catch (error) { }
}

const deleteUser = async () => {
    try {
        const user = await User.findById('66df385024987c84ab1f459b');
        if (user) {
            await user.deleteOne({ ...user._doc });
        }
    } catch (error) { }
}

deleteUser();

const updateUser = async () => {
    try {
        const user = await User.findById('66df385024987c84ab1f459b');
        if (user) {
            await user.updateOne({
                ...user._doc,
                name: 'Nick Name (updated v2.0)'
            });
        }
    } catch (err) { }
};

const findUser = async () => {
    try {
        const user = await User.findById('66df37511c66da108dcdceb1');
        console.log({ ...user._doc });
    } catch (err) { }
};

// Establecer variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 3000);
app.set('url', process.env.APP_URL || 'http://localhost');
app.set('env', process.env.APP_ENV || 'local');
app.set('secret_key', process.env.APP_SECRET_KEY || 'Yx>qor]QhQzjxp+13`QKB~@nc~CRRw');

// Configurar cors
const envKeys = Object.keys(process.env);
const envKeysCors = envKeys.filter(_env => _env.startsWith('APP_CORS_'));
const corsAllowed = envKeysCors.map(_env => process.env[_env]);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
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
}));

app.get('/', (req, res) => {
    return res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        success: true,
        source: [],
    });
});

app.post('/token', (req, res) => {
    const { id, email, password } = req.body;
    const encrypt_password = bcryptjs.hashSync(password, 10);
    const token = jwt.sign({ id, email, password: encrypt_password }, app.get('secret_key'), { expiresIn: '10m' });
    return res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        success: true,
        source: token,
    });
});

const rutaProtegida = (req, res, next) => {
    const auth = req.headers['authorization'] || null;
    const bearer_token = auth.split(' ');

    if (auth && bearer_token[0].indexOf('Bearer') === 0 && bearer_token[1]) {
        const token = bearer_token[1];
        jwt.verify(token, app.get('secret_key'), (err, payload) => {
            if (err) {
                return res.status(401).json({
                    ctx_content: 'Acceso denegado.',
                    success: false,
                    source: null,
                });
            }
            req.session_payload = payload;
            next();
        });
    }
};

app.post('/protegido', rutaProtegida, (req, res) => {
    const { email, password } = req.body;
    const session_email = req.session_payload.email;
    const session_password = req.session_payload.password;

    const compare_password = bcryptjs.compareSync(password, session_password);
    const compare_email = email === session_email;

    if (compare_password && compare_email) {
        return res.status(200).json({
            ctx_content: 'EndPoint funciona correctamente.',
            success: true,
            source: null,
        });
    } else {
        return res.status(500).json({
            ctx_content: 'Credenciales incorrectas.',
            success: false,
            source: null,
        });
    }
});

app.listen(app.get('port'), () => {
    console.log(`Servidor: ${app.get('url')}:${app.get('port')}`);
});