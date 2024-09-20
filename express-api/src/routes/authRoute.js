import express from 'express';
import { authRegister, authSignIn, authCheckAuth, authLogOut } from '../controllers/authController.js';
import configJwt from '../config/configJwt.js';
const authRoute = express.Router();

authRoute.post('/register', authRegister);

authRoute.post('/login', authSignIn);

authRoute.post('/logout', authLogOut);

authRoute.post('/check-auth', configJwt, authCheckAuth);

export default authRoute;