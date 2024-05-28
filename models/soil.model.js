import mongoose from "mongoose";
import express from "express";

const soilSchema = new mongoose.Schema({
    photo_url : {type: String},
    name: {type: String, required: true},
    organization: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true},
    email: {type: String, required : true},
    phone: {type: String, required : true}
}, {timestamps: true});

export const soilModel  = mongoose.model('soils', soilSchema);