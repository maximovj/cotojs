import conn from '../config/mongooseConfig.js';

const user = conn.model('user', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

export default user;