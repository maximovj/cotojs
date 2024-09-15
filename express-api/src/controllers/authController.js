import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/userModel.js';
dotenv.config();
const User = user;

const secret_key = process.env.APP_SECRET_KEY || 'Yx>qor]QhQzjxp+13`QKB~@nc~CRRw';

const authRegister = async (req, res) => {
    const { id, name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
        return res.status(403).json({
            ctx_content: 'Todos los campos son obligatorios.',
            success: false,
            _src: null,
        });
    }

    const encrypt_password = bcryptjs.hashSync(password.trim(), 10);
    const new_user = new User({
        name: name.trim(),
        email: email.trim(),
        password: encrypt_password,
    });

    try {
        const userSave = await new_user.save();

        if (userSave) {
            return res.status(200).json({
                ctx_content: 'Usuario registrado exitosamente.',
                success: true,
                _src: null,
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _src: null,
        });
    }
};

const authSignIn = async (req, res) => {
    const { email, password } = req.body;
    const find_user = await user.findOne({ email: email });

    if (!find_user) {
        return res.status(404).json({
            ctx_content: 'Usuario no registrado.',
            success: false,
            _src: null,
        });
    }

    const session_id = find_user._id;
    const session_email = find_user.email;
    const session_password = find_user.password;

    const compare_password = bcryptjs.compareSync(password, session_password);
    const compare_email = email === session_email;

    if (compare_password && compare_email) {
        const token = jwt.sign({
            id: session_id,
            email: session_email
        },
            secret_key,
            { expiresIn: '1h' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en producción
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', // Dependiendo del entorno
            maxAge: 3600000, // 1 hora en milisegundos
            path: '/',
        });

        delete find_user._doc.password;

        return res.status(200).json({
            ctx_content: 'Inicio sesión correctamente.',
            success: true,
            _src: {
                ...find_user._doc,
            },
        });
    } else {
        return res.status(500).json({
            ctx_content: 'Credenciales incorrectas.',
            success: false,
            _src: null,
        });
    }
};

const authCheckAuth = async (req, res) => {
    try {
        const user_id = req.session_payload.id;
        const find_user = await User.findById(user_id)
            .select('-password');

        if (!find_user) {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema.',
                success: false,
                _src: null,
            });
        }

        return res.status(200).json({
            ctx_content: 'Usuario autenticado exitosamente.',
            success: true,
            _src: find_user,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _src: null,
        });
    }
};

const authLogOut = (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({
        ctx_content: 'Cerro sesión correctamente.',
        success: true,
        _src: null,
    });
};

export { authRegister, authSignIn, authCheckAuth, authLogOut }