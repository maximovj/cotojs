import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const secret_key = process.env.APP_SECRET_KEY || 'Yx>qor]QhQzjxp+13`QKB~@nc~CRRw';

const configJwt = (req, res, next) => {
    const token = req.session.token;

    if (!token) return res.status(401).json({ ctx_content: 'Acceso no autorizado.', success: false });

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) return res.status(403).json({ ctx_content: 'Token inválido.', success: false });
        req.session.user = decoded;
        next();
    });
};

export default configJwt;