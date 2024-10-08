import express from 'express';
import configJwt from '../config/configJwt.js';
const mainRoute = express.Router();

mainRoute.get('/privado', configJwt, (req, res) => {
    //console.log('req.method:', req.method);
    //console.log('req.url:', req.url);
    //console.log('req.baseUrl:', req.baseUrl);
    //console.log('req.originalUrl:', req.originalUrl);
    //console.log('req.headers.origin:', req.headers['origin']);
    //console.log('req.headers.host:', req.headers['host']);

    //console.log('req.headers: ', req.headers);
    //console.log('req.params: ', req.params);
    //console.log('req.body: ', req.body);
    //console.log('req.route: ', req.route);
    //console.log('req.session.user: ', req.session.user);

    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/privado',
        success: true,
        _src: null,
    });
});

mainRoute.get('/publico', (req, res) => {
    res.status(200).json({
        ctx_content: 'EndPoint funciona correctamente.',
        base_url: '/main/publico',
        success: true,
        _src: null,
    });
});

export default mainRoute;