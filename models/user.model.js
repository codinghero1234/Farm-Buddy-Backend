import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address : {type: String, required: true}
}, {timestamps: true});

const userModel = mongoose.model('users', userSchema);


const tempUserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address : {type: String, required: true}
}, {timestamps: true});

const tempUserModel = mongoose.model('tempUsers', tempUserSchema);

export {userModel, tempUserModel};