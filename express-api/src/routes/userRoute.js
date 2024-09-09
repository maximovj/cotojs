import express from 'express';
import { findUser, createUser, deleteUser, updateUser } from '../controllers/userController.js';
const userRoute = express.Router();

userRoute.post('/user', createUser);

userRoute.put('/user', updateUser);

userRoute.get('/user', findUser);

userRoute.delete('/user', deleteUser);

export default userRoute;