import { Schema } from 'mongoose';
import conn from '../config/mongooseConfig.js';
const smTypes = Schema.Types;

const user = conn.model('user', new Schema(
    {
        name: {
            type: smTypes.String,
            required: true,
        },
        email: {
            type: smTypes.String,
            required: true,
            unique: true,
        },
        password: {
            type: smTypes.String,
            required: true,
        },
    },
    {
        timestamps: true,
        capped: { size: 1048576, max: 1000 },
        minimize: false,
        collation: { locale: 'es', strength: 2 },
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
));

export default user;