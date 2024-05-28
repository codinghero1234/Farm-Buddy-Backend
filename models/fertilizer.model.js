import mongoose from "mongoose";

const fertilizerSchema = new mongoose.Schema({
    photo_url: {type: String},
    name: { type: String, required: true },
    item_weight: { type: String, required: true },
    coverage: { type: String, required: true },
    about_this_item: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    item_form: { type: String, required: true },
    specific_users: { type: String, required: true },
    email: {type: String, required: true}
}, { timestamps: true });

export const fertilizerModel = mongoose.model('fertilizers', fertilizerSchema);