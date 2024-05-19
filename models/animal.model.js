import mongoose from "mongoose";
import express from "express";

const animalSchema = new mongoose.Schema({
    animal_type: {type: String, required: true},
    weight: {type: String, required: true},
    description: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: String, required: true},
    location: {type: String, required: true},
    photo: {type: Buffer, required: true},
    photo_originalName: {type: String, required: true},
    photo_mimetype: {type: String, required: true}
}, {timestamps: true});

export const animalModel  = mongoose.model('animals', animalSchema);