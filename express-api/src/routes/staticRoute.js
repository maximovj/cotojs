import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import room from '../models/roomModel.js';
import user from '../models/userModel.js';
const staticRoute = express.Router();
const Room = room;
const User = user;

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

const upload_users_picture = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'storage/users/picture');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

staticRoute.post('/users/picture/:id', upload_users_picture.single('picture'), async (req, res) => {
    try {
        const user_id = req.params.id;
        const pathPicture = req.file.path;

        const find_user = await User.findById(user_id);

        if (find_user) {
            find_user.picture = pathPicture || find_user.picture;
            // Actualizar la propiedad `picture`
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
