import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: { type: String, required: true },
    photo_url: { type: String },
    weight: { type: String, required: true },
    no_of_items: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price_in_kg: { type: String, required: true },
    brand: { type: String, required: true },
    diet_type: { type: String, required: true },
    net_quantity: { type: String, required: true },
    contact: { type: String, required: true },
}, { timestamps: true });   


export const productModel = mongoose.model("products", productSchema)