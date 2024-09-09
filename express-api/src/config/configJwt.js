import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const secret_key = process.env.APP_SECRET_KEY || 'Yx>qor]QhQzjxp+13`QKB~@nc~CRRw';

const configJwt = (req, res, next) => {
    const auth = req.headers['authorization'] || '';
    const bearer_token = auth.split(' ');

    if (auth && bearer_token[0].indexOf('Bearer') === 0 && bearer_token[1]) {
        const token = bearer_token[1];
        jwt.verify(token, secret_key, (err, payload) => {
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
    } else {
        return res.status(403).json({
            ctx_content: 'Token no proporcionado.',
            success: false,
            source: null,
        });
    }
};

export default configJwt;