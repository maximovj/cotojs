import { io } from "socket.io-client";
const domain = import.meta.env.VITE_SOCKET_IO_DOMAIN;
const path = import.meta.env.VITE_SOCKET_IO_PATH;

const socketService = io(`${domain}`, {
    path: `${path}`,
    transports: ['websocket'],
    withCredentials: true,
});

socketService.on("connect", () => {
    socketService.emit("presentacion_bienvenida", "Hola me conecto, este es mi id: " + socketService.id);
    //console.log('ha establecido conexión con socket.io');
});

socketService.on('presentacion_respuesta', (arg) => {
    console.log(arg);
});

socketService.on("disconnect", () => {
    console.log('ha perdido conexión con socket.io');
});

socketService.on("connect_error", (error) => {
    if (socketService.active) {
        // temporary failure, the socket will automatically try to reconnect
    } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(error.message);
    }
});

export default socketService;