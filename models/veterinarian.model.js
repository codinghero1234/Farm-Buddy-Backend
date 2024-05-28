import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema({
    username: {type: String, required: true},
    aadhar_number: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    date_of_birth: {type: String, required: true},
    gender: {type: String, required: true},
    service_type: {type: [String], default: []},
    clinic_name: {type: String, required: true},
    clinic_address: {type: String, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zip: {type: String, required: true},
    years_of_experience: {type: String, required: true},
    specializations : {type: [String], default: []},
    pricing_model: {type: String, required: true},
    price: {type: String, required: true},
    open_from: {type: String, required: true},
    open_to: {type: String, required: true},
    opening_time: {type: String, required: true},
    closing_time: {type: String, required: true},
    service_area: {type: String, required: true},
    photo_url: {type: String},
    email: {type: String, required: true}
}, {timestamps: true});

const veterinarianModel = mongoose.model("veterinarians", veterinarianSchema);

export default veterinarianModel;