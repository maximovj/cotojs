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
        console.log(err.code);
        if(err.code === 11000){
            return res.status(400).json({
                ctx_content: 'Usuario ya registrado en el sistema.',
                success: false,
                _src: null,
            });
        }else {
            return res.status(500).json({
                ctx_content: err.message,
                success: false,
                _src: null,
            });
        }
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

    const compare_password = bcryptjs.compareSync(password, find_user.password);
    const compare_email = email === find_user.email;

    if (compare_password && compare_email) {
        // Generar token de 15 minutos de duración
        const token = jwt.sign({
            id: find_user._id,
            email: find_user.email
        },
            secret_key,
            { expiresIn: '1h' });

        // Guardar token generado
        req.session.token = token;

        // Quitar el password
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
        const session_id = req.session.user.id;
        const find_user = await User.findById(session_id)
            .select('-password');

        if (!find_user) {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema.',
                success: false,
                _src: null,
            });
        }

        // Renovar token de 15 minutos de duración
        const token = jwt.sign({
            id: find_user.id,
            email: find_user.email
        },
            secret_key,
            { expiresIn: '1h' });

        // Guardar token generado
        req.session.token = token;

        return res.status(200).json({
            ctx_content: 'Usuario autenticado exitosamente.',
            success: true,
            _src: find_user,
            token: token,
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
    // Destruir la sesión actual
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                ctx_content: 'Error al cerrar sesión.',
                success: false,
                _src: null,
            });
        }
        // Eliminar la cookie de sesión (si es necesario)
        res.clearCookie('connect.sid');
        return res.status(200).json({
            ctx_content: 'Sesión cerrada exitosamente.',
            success: true,
            _src: null,
        });
    });
};

export { authRegister, authSignIn, authCheckAuth, authLogOut }