import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

const secret_key = process.env.APP_SECRET_KEY || 'Yx>qor]QhQzjxp+13`QKB~@nc~CRRw';

const authRegister = (req, res) => {
    const { id, email, password } = req.body;
    const encrypt_password = bcryptjs.hashSync(password, 10);
    const token = jwt.sign({ id, email, password: encrypt_password }, secret_key, { expiresIn: '10m' });

    return res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        success: true,
        _src: token,
    });
};

const authSignIn = (req, res) => {
    const { email, password } = req.body;
    const session_email = req.session_payload.email;
    const session_password = req.session_payload.password;

    const compare_password = bcryptjs.compareSync(password, session_password);
    const compare_email = email === session_email;

    if (compare_password && compare_email) {
        return res.status(200).json({
            ctx_content: 'EndPoint funciona correctamente.',
            success: true,
            _src: null,
        });
    } else {
        return res.status(500).json({
            ctx_content: 'Credenciales incorrectas.',
            success: false,
            _src: null,
        });
    }
};

export { authRegister, authSignIn }