import { Server as ServerIO } from "socket.io";
import configSocket from "../config/configSocket.js";

const setupSocketIO = (server) => {
    const io = new ServerIO(server, configSocket);

    io.on('connection', (socket) => {

        socket.on('new_room', (room) => {
            io.emit('on_rooms', room);
        });

        socket.on('join_room', (room) => {
            socket.join(room.id);
        });

        socket.on('message_sended', (arg) => {
            io.to(arg.room).emit('on_messages', arg);
        });

        socket.on("presentacion_bienvenida", (arg) => {
            //console.log(arg);
            socket.emit('presentacion_respuesta', 'Ok.');
        });

        socket.on('disconnect', () => { });
    });

    return io;
}

export default setupSocketIO;