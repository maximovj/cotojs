import { Server as ServerIO } from "socket.io";
import configSocket from "../config/configSocket.js";

const setupSocketIO = (server) => {
    const io = new ServerIO(server, configSocket);

    io.on('connection', (socket) => {

        socket.on('join_room', (room) => {
            socket.join(room.id);
        });

        socket.on('message_sended', (arg) => {
            io.to(arg.room).emit('on_messages', arg);
        });

        socket.on("presentacion_bienvenida", (arg) => {
            socket.emit('presentacion_respuesta', 'Ok. Entendido. Estoy al pendiente.');
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
}

export default setupSocketIO;