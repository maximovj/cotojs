import { Server as ServerIO } from "socket.io";
import configSocket from "../config/configSocket.js";

const setupSocketIO = (server) => {
    const io = new ServerIO(server, configSocket);
    return io;
}

export default setupSocketIO;