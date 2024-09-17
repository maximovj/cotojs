import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import multer from 'multer';
import room from '../models/roomModel.js';
import user from '../models/userModel.js';
const staticRoute = express.Router();
const Room = room;
const User = user;

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define el directorio donde están los archivos estáticos
const staticDir = path.join(__dirname, '../../storage');

async function retryDelete(filePath, retries = 3, delay = 500) {
    while (retries > 0) {
        try {
            await fs.unlink(filePath);
            console.log(`Archivo eliminado: ${filePath}`);
            return;
        } catch (err) {
            if (err.code === 'EPERM' || err.code === 'EBUSY') {
                console.warn(`Error al eliminar el archivo, reintentando... (${retries})`);
                retries -= 1;
                await new Promise(resolve => setTimeout(resolve, delay)); // Espera antes de reintentar
            } else {
                throw err;
            }
        }
    }
    console.error(`No se pudo eliminar el archivo después de varios intentos: ${filePath}`);
}

const storage_room_cover = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/rooms/cover');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload_room_cover = multer({ storage: storage_room_cover });
staticRoute.post('/rooms/cover/:id', upload_room_cover.single('cover'), async (req, res) => {
    try {
        const room_id = req.params.id;
        const coverPath = req.file.path;

        const find_room = await Room.findById(room_id);
        if (find_room && coverPath) {
            find_room.cover = coverPath || find_room.cover;
            await find_room.updateOne(find_room._doc);
            return res.status(200).json({
                ctx_content: 'Imagen de portada actualizada con éxito',
                success: true,
                _doc: find_room
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Sala no encontrada en el sistema',
                success: false,
                _doc: null
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null
        });
    }
});

// Configurar multer para almacenar las imágenes
const upload_users_picture = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'upload/users/picture'); // Carpeta donde se guardarán las imágenes
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Asignar nombre único
        },
    }),
});

// Ruta para subir la imagen de perfil
staticRoute.post('/users/picture/:id', upload_users_picture.single('picture'), async (req, res) => {
    try {
        const user_id = req.params.id;
        const originalPath = req.file.path; // Ruta original de la imagen

        const find_user = await User.findById(user_id);

        if (find_user) {
            // Generar una nueva ruta para el thumbnail (nombre diferente)
            const thumbnail = path.join(`storage`, `users`, `thumbnail`, `thumbnail_${Date.now()}.jpg`);

            // Usar Sharp para reducir el tamaño de la imagen, crear y guardar el thumbnail 
            await sharp(originalPath)
                .resize(300, 300)
                .jpeg({ quality: 80 })
                .toFile(thumbnail);

            // Eliminar la imagen original si ya no es necesaria
            //fs.rmSync(originalPath);

            // Actualizar el campo `picture` del usuario con la ruta del thumbnail
            find_user.picture = thumbnail || find_user.picture;

            // Guardar los cambios en la base de datos
            await find_user.updateOne(find_user._doc);

            return res.status(200).json({
                ctx_content: 'Foto de perfil actualizada con éxito',
                success: true,
                _doc: find_user
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema',
                success: false,
                _doc: null
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null
        });
    }
});

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
