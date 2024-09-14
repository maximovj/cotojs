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

export const allRoom = async (req, res) => {
    try {
        const find_rooms = await Room.find();
        return res.status(200).json({
            ctx_content: 'Sala creado exitosamente.',
            success: true,
            _doc: find_rooms,
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
            ctx_content: 'Sala localizado exitosamente.',
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