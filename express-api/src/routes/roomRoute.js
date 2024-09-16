import express from 'express';
import {
    createRoom,
    findRoom,
    joinToRoom,
    paginationRoom,
    leaveRoom,
    mineRoom,
    deleteRoom,
    updateRoom
} from '../controllers/roomController.js';

const roomRoute = express.Router();

// EndPoint para crear una sala 
roomRoute.post('/', createRoom);

// EndPoint para listar todas las salas con paginación
roomRoute.get('/all', paginationRoom);

// EndPoint para listar las salas de un usuario con paginación
roomRoute.get('/mine', mineRoom);

// EndPoint para ver una sala (debe estar antes de los endpoints que contienen parámetros dinámicos)
roomRoute.get('/:id', findRoom);

// EndPoint para unirme a una sala
roomRoute.post('/join/:id', joinToRoom);

// EndPoint para dejar una sala
roomRoute.post('/leave/:id', leaveRoom);

// EndPoint para eliminar una sala
roomRoute.delete('/:id', deleteRoom);

// EndPoint para actualizar una sala
roomRoute.put('/:id', updateRoom);

export default roomRoute;
