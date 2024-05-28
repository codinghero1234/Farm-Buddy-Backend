import express from "express";
import mongoose from "mongoose";
import { soilModel } from "../models/soil.model.js";

export const addsoilController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newsoil = await soilModel.create(data);
        if (!newsoil) {
            return res.status(400).json("Error creating new soil");
        }
        return res.status(200).json(newsoil);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getsoilController = async (req, res) => {
    const id = req.params.id;
    try {
        const soil = await soilModel.findById(id);
        if (!soil) {
            return res.status(404).json("soil not found");
        }
        return res.status(200).json(soil);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllsoilController = async (req, res) => {
    try {
        const soil = await soilModel.find();
        if (!soil) {
            return res.status(404).json("soils not found");
        }
        return res.status(200).json(soil);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deletesoilController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const soil  = await soilModel.findOne({_id: id});
        if(!soil){
            return res.status(400).json("soil not found !");
        }
        if(soil.email != email){
            return res.status(401).json("This soil is not yours , you can't delete it, only creator can delete it");
        }
        const deletedsoil = await soilModel.findByIdAndDelete(id);
        if(!deletedsoil){
            return res.status(400).json("Error deleting the soil");
        }
        return res.status(200).json("soil Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editsoilController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedsoil = await soilModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedsoil){
            return res.status(400).json("Error editing the soil");
        }
        return res.status(200).json(updatedsoil);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYsoilController = async(req, res) => {
    const email = req.email;
    try {
        const soils = await soilModel.find({email: email});
        if(!soils){
            return res.status(400).json("Error getting your soils");
        }
        return res.status(200).json(soils);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}