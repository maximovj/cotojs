import user from '../models/userModel.js';
import message from '../models/messageModel.js';
import room from '../models/roomModel.js';
import bcryptjs from 'bcryptjs';
const User = user;
const Message = message;
const Room = room;

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name.trim() || !email.trim() || !password.trim()) {
            return res.status(403).json({
                ctx_content: 'Todos los campos son obligatorios.',
                success: false,
                _doc: null,
            });
        }

        const encrypt_password = bcryptjs.hashSync(password.trim(), 10);
        const new_user = new User({
            name: name.trim(),
            email: email.trim(),
            password: encrypt_password,
        });

        const saveUser = await new_user.save();
        if (saveUser) {
            return res.status(201).json({
                ctx_content: 'Usuario creado exitosamente.',
                success: true,
                _doc: new_user._doc,
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Usuario no creado en el sistema.',
                success: false,
                _doc: null,
            });
        }
    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id, email } = req.session.user;
        const find_user = await User.findOne({ _id: id, email: email }).select('-password');

        if (find_user) {
            // Eliminar los mensajes asociados al usuario
            await Message.deleteMany({ send_by: id });

            // Eliminar las salas asociadas al usuario
            //await Room.deleteMany({ members: id });

            // Quitar el usuario de la lista de miembros en cada sala
            await Room.updateMany(
                { members: id },
                { $pull: { members: id } }
            );

            // Eliminar las salas creadas por el usuario
            await Room.deleteMany({ created_by: id });

            // Eliminar el usuario
            await find_user.deleteOne();

            return res.status(200).json({
                ctx_content: 'Usuario eliminado exitosamente.',
                success: true,
                _doc: find_user._doc,
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema.',
                success: false,
                _doc: null,
            });
        }

    } catch (err) {
        return res.status(500).json({
            ctx_content: err.message,
            success: false,
            _doc: null,
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, email } = req.session.user;
        const { name } = req.body;
        const find_user = await User.findOne({ _id: id, email: email }).select('-password');

        if (find_user) {
            await find_user.updateOne({
                ...find_user._doc,
                name: name.trim() || find_user.name,
            });
            return res.status(200).json({
                ctx_content: 'Usuario modificado exitosamente.',
                success: true,
                _doc: find_user._doc,
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema.',
                success: false,
                _doc: null,
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

const findUser = async (req, res) => {
    try {
        const { id, email } = req.session.user;
        const find_user = await User.findOne({ _id: id, email: email });

        if (find_user) {
            return res.status(200).json({
                ctx_content: 'Usuario localizado exitosamente.',
                success: true,
                _doc: find_user._doc,
            });
        } else {
            return res.status(404).json({
                ctx_content: 'Usuario no encontrado en el sistema.',
                success: false,
                _doc: null,
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

export { createUser, findUser, deleteUser, updateUser }