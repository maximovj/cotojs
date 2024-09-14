import { Schema } from 'mongoose';
import conn from '../config/mongooseConfig.js';
const smTypes = Schema.Types;

const message = conn.model('message', Schema(
    {
        text: {
            type: smTypes.String,
            required: true,
        },
        media: {
            type: smTypes.String,
            required: false,
        },
        type: {
            type: smTypes.String,
            required: false,
        },
        send_by: {
            type: smTypes.ObjectId,
            ref: 'user',
            required: true,
        },
        room: {
            type: smTypes.ObjectId,
            ref: 'room',
            required: true,
        }
    },
    {
        timestamps: true,
        capped: { size: 1024, max: 100 },
        minimize: false,
        collation: { locale: 'es', strength: 2 },
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
));

export default message;