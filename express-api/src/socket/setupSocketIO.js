import { Server as ServerIO } from "socket.io";
import configSocket from "../config/configSocket.js";

const setupSocketIO = (server) => {
    const io = new ServerIO(server, configSocket);

    io.on('connection', (socket) => {

        socket.on("presentacion_bienvenida", (arg) => {
            console.log(arg);
            socket.emit('presentacion_respuesta', 'Ok. Entendido. Estoy al pendiente.');
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
}

export default setupSocketIO;