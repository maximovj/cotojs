import message from '../models/messageModel.js';
import user from '../models/userModel.js';
const Message = message;
const User = user;

export const createMessage = async (req, res) => {
    try {
        const user_id = req.session_payload.id;
        const room_id = req.params.id;
        const { text } = req.body;

        const find_user = await User.findById(user_id);

        if (!find_user) {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema',
                success: false,
                _doc: null,
            });
        }

        const new_message = new Message({
            text: text,
            send_by: find_user,
            room: room_id,
        });

        const messageSave = new_message.save();
        if (messageSave) {
            return res.status(201).json({
                ctx_content: 'Mensaje registrado exitosamente.',
                success: true,
                _doc: new_message,
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

export const findMessage = async (req, res) => {
    try {
        const room_id = req.params.id;
        const user_id = req.session_payload.id;

        const find_messages = await Message.find({ room: room_id })
            .populate('send_by', 'name email')
            .exec();

        if (!find_messages) {
            return res.status(404).json({
                ctx_content: 'Mensajes no encontrados en el sistema.',
                success: true,
                user_id: user_id,
                _doc: find_messages,
            });
        } else {
            return res.status(201).json({
                ctx_content: 'Mensajes localizados exitosamente.',
                success: true,
                user_id: user_id,
                _doc: find_messages,
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