import mongoose from 'mongoose';
import AppError from "../../src/utils/AppError.js";
import { validate } from 'uuid';

const schema = new mongoose.Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    maxAppointments: {
        type: Number,
        default: 5
    }
}, { timestamps: true });


export const workingTimeModel = mongoose.model('WorkingTime', schema);
