import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name: {type: String, required: true},
weight: {type: String, required: true},
no_of_items: {type: String, required: true},
location: {type: String, required: true},
descriptin: {type: String, required: true},
price: {type: String, required: true},
brand: {type: String, required: true},
net_quantity: {type: String, required: true},
contact: {type: String, required: true},
photo: {type: Buffer, required: true},
photo_originalName: {type: String, required: true},
photo_mimetype: {type: String, required: true}
}, {timestamps: true});


export const productModel = mongoose.model("products", productSchema)