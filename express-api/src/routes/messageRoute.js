import express from 'express';
import { createMessage, findMessage } from '../controllers/messageController.js';
const messageRoute = express.Router();

messageRoute.post('/room/:id', createMessage);

messageRoute.get('/room/:id', findMessage);

export default messageRoute;