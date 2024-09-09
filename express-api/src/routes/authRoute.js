import express from 'express';
import { authRegister, authSignIn } from '../controllers/authController.js';
const authRoute = express.Router();

authRoute.post('/register', authRegister);

authRoute.post('/sign_in', authSignIn);

export default authRoute;