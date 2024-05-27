import mongoose, { mongo } from "mongoose";

const fertilizerSchema = new mongoose.Schema({
name: {type: String, required: true},
weight: {type: String, required: true},
coverage: {type: String, required: true},
about: {type: String, required: true},
price: {type: String, required: true},
brand: {type: String, required: true},
item_form: {type: String, required: true},
specific_users: {type: String, required: true},
photo: {type: Buffer, required: true},
photo_originalName: {type: String, required: true},
photo_mimetype: {type: String, required: true}
}, {timestamps : true});

export const fertilizerModel = mongoose.model('fertilizers', fertilizerSchema);