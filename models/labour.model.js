import mongoose from "mongoose";
import express from "express";

const labourSchema = new mongoose.Schema({
    username : {type: String, required : true},
    addhar_no : {type: String, required : true},
    email: {type: String, required : true},
    phone: {type: String, required : true},
    date_of_birth: {type: String, required : true},
    gender: {type: String, required : true},
    photo_url :{type: String, required : true},
    city : {type: String, required : true},
    state: {type: String, required : true},
    years_of_experience: {type: String, required : true},
    specialization : {type: String, required : true},
    daily_wage: {type: String, required : true},
    monthly_wage: {type: String, required : true},
    availability : {type: String, required : true},
    service_area: {type: String, required : true}
}, {timestamps: true});

export const labourModel  = mongoose.model('labours', labourSchema);