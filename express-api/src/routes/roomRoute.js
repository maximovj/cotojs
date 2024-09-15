import express from 'express';
import { createRoom, findRoom, joinToRoom, paginationRoom, leaveRoom, mineRoom } from '../controllers/roomController.js';
const roomRoute = express.Router();

// EndPoint para crear una sala 
roomRoute.post('/', createRoom);

// EndPoint para listar todos las salas con paginación
roomRoute.get('/all', paginationRoom);

// EndPoint para listar las salas de un usuario con paginación
roomRoute.get('/mine', mineRoom);

// EndPoint para ver una sala 
roomRoute.get('/:id', findRoom);

// EndPoint para unirme una sala 
roomRoute.post('/join/:id', joinToRoom);

// EndPoint para dejar una sala 
roomRoute.post('/leave/:id', leaveRoom);

export default roomRoute;