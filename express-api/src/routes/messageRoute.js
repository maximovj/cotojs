import express from 'express';
import { createMessage, findMessage, mineMessage, deleteMessage } from '../controllers/messageController.js';
const messageRoute = express.Router();

// EndPoint para crear un mensaje desde chat de sala
messageRoute.post('/room/:id', createMessage);

// EndPoint para obtener todos los mensajes de una sala
messageRoute.get('/room/:id', findMessage);

// EnPoint para obtener todos los mensajes de un usuario, con paginación
messageRoute.get('/mine', mineMessage);

// EndPoint para eliminar un mensaje 
messageRoute.delete('/:id', deleteMessage);

export default messageRoute;