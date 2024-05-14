import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    expiry: {type: Date, default: Date.now() + (1000*60*2)},
}, {timestamps: true});

const otpModel = model('otps', otpSchema);

export default otpModel;