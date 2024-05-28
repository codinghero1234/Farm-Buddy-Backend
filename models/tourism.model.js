import mongoose from "mongoose";
import express from "express";

const tourismSchema = new mongoose.Schema({
    photo_url : {type: String},
    farm_name: {type: String, required: true},
    owner_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    farm_specialization: {type: String, required: true},
    availability: {type: String, required: true},
    check_in : {type: String, required: true},
    check_out: {type: String, required: true},
    total_price: {type: String, required: true}
}, {timestamps: true});

 const tourismModel  = mongoose.model('tourisms', tourismSchema);

 export default tourismModel;