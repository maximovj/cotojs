import express from 'express';
import { createRoom, findRoom, joinToRoom, paginationRoom } from '../controllers/roomController.js';
const roomRoute = express.Router();

roomRoute.post('/', createRoom);

roomRoute.get('/all', paginationRoom);

roomRoute.get('/:id', findRoom);

roomRoute.post('/join/:id', joinToRoom);

export default roomRoute;