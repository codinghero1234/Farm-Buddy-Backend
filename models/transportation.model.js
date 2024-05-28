import express from "express";
import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    aadhar_number: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    gender: { type: String, required: true },
    service_types: { type: [String], default: [] },
    vechicle_types: { type: [String], default: [] },
    description: { type: String, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
    expertise: { type: [String], default: [] },
    pricing_model: { type: String, required: true },
    price: { type: String, required: true },
    open_from: { type: String, required: true },
    open_to: { type: String, required: true },
    open_time: { type: String, required: true },
    closing_time: { type: String, required: true },
    service_area: { type: String, required: true },
    photo_url: {type: String},
    email: {type: String, required: true}
}, { timestamps: true });

export const transportationModel = mongoose.model("transportation", transportationSchema);