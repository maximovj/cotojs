import user from '../models/userModel.js';
const User = user;

const createUser = async (req, res) => {
    try {
        const user = new User({
            name: 'Nick Example',
            email: 'nick@example.com'
        });

        const saveUser = await user.save();
        if (saveUser) {
            return res.status(201).json({
                ctx_content: 'Usuario creado exitosamente.',
                success: true,
                _doc: user._doc,
            });
        } else {
            return res.status(403).json({
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
        const user = await User.findById('66df385024987c84ab1f459b');
        if (user) {
            await user.deleteOne({ ...user._doc });
            return res.status(200).json({
                ctx_content: 'Usuario eliminado exitosamente.',
                success: true,
                _doc: user._doc,
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
        const user = await User.findById('66df385024987c84ab1f459b');
        if (user) {
            await user.updateOne({
                ...user._doc,
                name: 'Nick Name (updated v2.0)'
            });
            return res.status(200).json({
                ctx_content: 'Usuario modificado exitosamente.',
                success: true,
                _doc: user._doc,
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
        const user = await User.findById('66df37511c66da108dcdceb1');
        if (user) {
            return res.status(200).json({
                ctx_content: 'Usuario modificado exitosamente.',
                success: true,
                _doc: user._doc,
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