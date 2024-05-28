import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    email: {type: String, required: true},
    photo_url : {type: String},
    name: { type: String, required: true },
    material: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    weight: { type: String, required: true },
    contact: { type: String, required: true },
    delivery_status: { type: String, required: true },
}, { timestamps: true });

export const equipmentModel = mongoose.model('equipments', equipmentSchema);    