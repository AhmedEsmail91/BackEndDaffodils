import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: '5m', default: Date.now } // OTP expires after 5 minutes
});
export const otpModel = mongoose.model('Otp', schema);
