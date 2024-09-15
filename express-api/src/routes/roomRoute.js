import express from 'express';
import { createRoom, findRoom, joinToRoom, paginationRoom, leaveRoom } from '../controllers/roomController.js';
const roomRoute = express.Router();

roomRoute.post('/', createRoom);

roomRoute.get('/all', paginationRoom);

roomRoute.get('/:id', findRoom);

roomRoute.post('/join/:id', joinToRoom);

roomRoute.post('/leave/:id', leaveRoom);

export default roomRoute;