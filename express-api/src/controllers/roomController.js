import room from '../models/roomModel.js';
const Room = room;

export const createRoom = async (req, res) => {
    try {
        const { id } = req.session_payload;
        const { name, description, cover } = req.body;
        const new_room = new Room({
            name,
            description,
            cover,
            created_by: id,
        });

        await new_room.save();
        return res.status(200).json({
            ctx_content: 'Sala creado exitosamente.',
            success: true,
            _doc: new_room._doc,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
};

export const findRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const find_room = await Room.findById(id);
        const user_id = req.session_payload.id;

        if (!find_room) {
            return res.status(404).json({
                ctx_content: 'Sala no encontrado en el sistema.',
                success: false,
                _doc: null,
            });
        }

        return res.status(200).json({
            ctx_content: 'Sala localizado exitosamente.',
            success: true,
            user_id: user_id,
            _doc: find_room,
        });
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
}

export const joinToRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const session_id = req.session_payload.id;

        const join_room = await Room.findByIdAndUpdate(id,
            { $addToSet: { members: session_id } },
            { new: true }
        );

        if (!join_room) {
            return res.status(404).json({
                ctx_content: 'Sala no encontrado en el sistema.',
                success: false,
                _doc: null,
            });
        }

        return res.status(200).json({
            ctx_content: 'Se ha unido a la sala exitosamente.',
            success: true,
            _doc: join_room,
        });

    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
};

export const paginationRoom = async (req, res) => {
    try {
        const { page = 1, limit = 15 } = req.query;
        const rooms = await Room.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalRooms = await Room.countDocuments();
        console.log(page, rooms.length, totalRooms, {
            total_pages: Math.ceil(totalRooms / limit),
            current_page: parseInt(page),
        });

        return res.status(200).json({
            ctx_content: 'Listando salas exitosamente.',
            success: true,
            total_pages: Math.ceil(totalRooms / limit),
            current_page: parseInt(page),
            _doc: rooms,
        });

    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
}

export const mineRoom = async (req, res) => {
    const { page = 1, limit = 15 } = req.query;
    const user_id = req.session_payload.id;

    try {
        // Obtener el total de salas creadas por el usuario
        const total_rooms = await Room.countDocuments({ created_by: user_id });

        // Realizar la consulta con paginación, orden y población
        const find_rooms = await Room.find({ created_by: user_id })
            .populate('created_by', 'name email')
            .skip((page - 1) * limit) // Saltar los documentos según la página actual
            .limit(parseInt(limit)) // Limitar el número de documentos devueltos
            .sort({ createdAt: -1 })
            .exec();

        return res.status(200).json({
            ctx_content: 'Listando salas exitosamente.',
            success: true,
            _doc: find_rooms,
            total_rooms, // Total de salas
            current_page: parseInt(page),
            total_pages: Math.ceil(total_rooms / limit), // Total de páginas
        });
    } catch (error) {
        return res.status(500).json({
            ctx_content: 'Error al listar las salas.',
            success: false,
            error: error.message,
        });
    }
};

export const leaveRoom = async (req, res) => {
    try {
        const { id } = req.params; // ID de la sala
        const session_id = req.session_payload.id; // ID del usuario (de la sesión)

        // Eliminar al usuario de los miembros de la sala
        const leave_room = await Room.findByIdAndUpdate(id,
            { $pull: { members: session_id } },
            { new: true }
        );

        if (!leave_room) {
            return res.status(404).json({
                ctx_content: 'Sala no encontrada en el sistema.',
                success: false,
                _doc: null,
            });
        }

        return res.status(200).json({
            ctx_content: 'Has dejado la sala exitosamente.',
            success: true,
            _doc: leave_room,
        });

    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const find_room = await Room.findById(id);

        if (!find_room) {
            return res.status(404).json({
                ctx_content: 'Sala no encontrada en el sistema.',
                success: false,
                _doc: null,
            });
        } else {
            await find_room.deleteOne(find_room._doc);
            return res.status(200).json({
                ctx_content: 'Sala eliminado exitosamente.',
                success: true,
                _doc: find_room,
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
};