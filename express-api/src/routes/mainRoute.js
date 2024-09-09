import express from 'express';
import configJwt from '../config/configJWT.js';
const mainRoute = express.Router();

mainRoute.get('/main/privado', configJwt, (req, res) => {
    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/privado',
        success: false,
        _src: null,
    });
});

mainRoute.get('/main/publico', (req, res) => {
    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/publico',
        success: false,
        _src: null,
    });
});

export default mainRoute;