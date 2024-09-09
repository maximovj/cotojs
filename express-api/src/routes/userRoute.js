import express from 'express';
import { findUser, createUser, deleteUser, updateUser } from '../controllers/userController.js';
const userRoute = express.Router();

userRoute.post('/', createUser);

userRoute.put('/', updateUser);

userRoute.get('/', findUser);

userRoute.delete('/', deleteUser);

export default userRoute;