import express from "express";
import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    prompt: {type: String, required: true},
    answer: {type: String, required: true},
    email: {type: String, required: true},
});

const promptModel = mongoose.model('prompts', promptSchema);

export default promptModel;