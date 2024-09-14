import express from 'express';
import { createRoom, findRoom, allRoom, joinToRoom } from '../controllers/roomController.js';
const roomRoute = express.Router();

roomRoute.post('/', createRoom);

roomRoute.get('/all', allRoom);

roomRoute.get('/:id', findRoom);

roomRoute.post('/join/:id', joinToRoom);

export default roomRoute;