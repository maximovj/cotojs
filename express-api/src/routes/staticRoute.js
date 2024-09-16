import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
const staticRoute = express.Router();

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define el directorio donde están los archivos estáticos
const staticDir = path.join(__dirname, '../../static');

staticRoute.get('/rooms/cover/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(staticDir, 'rooms', 'cover', filename);
    const filePathDefault = path.join(staticDir, 'rooms', 'cover', '150.png');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.sendFile(filePathDefault);
        } else {
            res.sendFile(filePath);
        }
    });
});

export default staticRoute;
