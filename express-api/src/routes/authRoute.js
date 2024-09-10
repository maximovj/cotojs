import express from 'express';
import { authRegister, authSignIn, authCheckAuth, authLogOut } from '../controllers/authController.js';
import configJwt from '../config/configJWT.js';
const authRoute = express.Router();

authRoute.post('/register', authRegister);

authRoute.post('/sign-in', authSignIn);

authRoute.post('/logout', authLogOut);

authRoute.post('/check-auth', configJwt, authCheckAuth);

export default authRoute;