import app from "./src/app.js";

app.listen(app.get('port'), () => {
    console.log(`Servidor: ${app.get('url')}:${app.get('port')}`);
});