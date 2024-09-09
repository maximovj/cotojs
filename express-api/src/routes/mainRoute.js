import express from 'express';
import configJwt from '../config/configJWT.js';
const mainRoute = express.Router();

mainRoute.get('/privado', configJwt, (req, res) => {
    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/privado',
        success: false,
        _src: null,
    });
});

mainRoute.get('/publico', (req, res) => {
    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/publico',
        success: false,
        _src: null,
    });
});

export default mainRoute;