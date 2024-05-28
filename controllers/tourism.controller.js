import express from "express";
import mongoose from "mongoose";
import { tourismModel } from "../models/tourism.model.js";

export const addtourismController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newtourism = await tourismModel.create(data);
        if (!newtourism) {
            return res.status(400).json("Error creating new tourism");
        }
        return res.status(200).json(newtourism);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const gettourismController = async (req, res) => {
    const id = req.params.id;
    try {
        const tourism = await tourismModel.findById(id);
        if (!tourism) {
            return res.status(404).json("tourism not found");
        }
        return res.status(200).json(tourism);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAlltourismController = async (req, res) => {
    try {
        const tourism = await tourismModel.find();
        if (!tourism) {
            return res.status(404).json("tourisms not found");
        }
        return res.status(200).json(tourism);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deletetourismController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const tourism  = await tourismModel.findOne({_id: id});
        if(!tourism){
            return res.status(400).json("tourism not found !");
        }
        if(tourism.email != email){
            return res.status(401).json("This tourism is not yours , you can't delete it, only creator can delete it");
        }
        const deletedtourism = await tourismModel.findByIdAndDelete(id);
        if(!deletedtourism){
            return res.status(400).json("Error deleting the tourism");
        }
        return res.status(200).json("tourism Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const edittourismController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedtourism = await tourismModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedtourism){
            return res.status(400).json("Error editing the tourism");
        }
        return res.status(200).json(updatedtourism);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYtourismController = async(req, res) => {
    const email = req.email;
    try {
        const tourisms = await tourismModel.find({email: email});
        if(!tourisms){
            return res.status(400).json("Error getting your tourisms");
        }
        return res.status(200).json(tourisms);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}