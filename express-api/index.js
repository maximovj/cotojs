import { app, server } from "./src/app.js";

server.listen(app.get('port'), () => {
    console.log(`Servidor: ${app.get('url')}:${app.get('port')}`);
});