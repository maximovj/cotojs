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

// Configurar multer para almacenar las imágenes
const upload_rooms_cover = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'upload/rooms/cover');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

// Ruta para subir la imagen de portada para salas
staticRoute.post('/rooms/cover/:id', upload_rooms_cover.single('cover'), async (req, res) => {
    try {
        const room_id = req.params.id;
        const originalPath = req.file.path;

        const find_room = await Room.findById(room_id);
        if (find_room && originalPath) {

            // Generar una nueva ruta para el thumbnail (nombre diferente)
            const thumbnail = path.join(`storage`, `rooms`, `thumbnail`, `thumbnail_${find_room.id}.jpg`);

            // Usar Sharp para reducir el tamaño de la imagen, crear y guardar el thumbnail 
            await sharp(originalPath)
                .resize({
                    width: 240, // Ancho deseado 900
                    height: 240, // Altura deseada 600
                    fit: 'fill', // Ajustar el contenido sin recortar
                })
                .jpeg({ quality: 80 })
                .toFile(thumbnail);

            // Actualizar el campo `cover` del usuario con la ruta del thumbnail
            find_room.cover = thumbnail || find_room.cover;

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

// Ruta para subir la imagen de perfil para usuarios
staticRoute.post('/users/picture/:id', upload_users_picture.single('picture'), async (req, res) => {
    try {
        const user_id = req.params.id;
        const originalPath = req.file.path; // Ruta original de la imagen

        const find_user = await User.findById(user_id);

        if (find_user) {
            // Generar una nueva ruta para el thumbnail (nombre diferente)
            const thumbnail = path.join(`storage`, `users`, `thumbnail`, `thumbnail_${find_user.id}.jpg`);

            // Usar Sharp para reducir el tamaño de la imagen, crear y guardar el thumbnail 
            await sharp(originalPath)
                .resize({
                    width: 160, // Ancho deseado 300
                    height: 160, // Altura deseada 300
                    fit: 'fill', // Ajustar el contenido sin recortar
                })
                .jpeg({ quality: 80 })
                .toFile(thumbnail);

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
