import user from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
const User = user;

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
        const { id, email } = req.session_payload;
        const find_user = await User.findOne({ _id: id, email: email });

        if (find_user) {
            await find_user.deleteOne({ ...find_user._doc });
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
        const { id, email } = req.session_payload;
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
        const { id, email } = req.session_payload;
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