import { Schema } from 'mongoose';
import conn from '../config/mongooseConfig.js';
const smTypes = Schema.Types;

const room = conn.model('room', new Schema(
    {
        name: {
            type: smTypes.String,
            required: true,
        },
        description: {
            type: smTypes.String,
            required: true,
        },
        cover: {
            type: smTypes.String,
            required: false,
            default: null,
        },
        created_by: {
            type: smTypes.ObjectId,
            ref: 'user',
            required: true,
        },
        members: [{
            type: smTypes.ObjectId,
            ref: 'user',
            required: false,
            default: null,
        }]
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

export default room;