import express from "express";
import mongoose from "mongoose";
import veterinarianModel from "../models/veterinarian.model.js";

export const addveterinarianController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newveterinarian = await veterinarianModel.create(data);
        if (!newveterinarian) {
            return res.status(400).json("Error creating new veterinarian");
        }
        return res.status(200).json(newveterinarian);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getveterinarianController = async (req, res) => {
    const id = req.params.id;
    try {
        const veterinarian = await veterinarianModel.findById(id);
        if (!veterinarian) {
            return res.status(404).json("veterinarian not found");
        }
        return res.status(200).json(veterinarian);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllveterinarianController = async (req, res) => {
    try {
        const veterinarian = await veterinarianModel.find();
        if (!veterinarian) {
            return res.status(404).json("veterinarians not found");
        }
        return res.status(200).json(veterinarian);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deleteveterinarianController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const veterinarian  = await veterinarianModel.findOne({_id: id});
        if(!veterinarian){
            return res.status(400).json("veterinarian not found !");
        }
        if(veterinarian.email != email){
            return res.status(401).json("This veterinarian is not yours , you can't delete it, only creator can delete it");
        }
        const deletedveterinarian = await veterinarianModel.findByIdAndDelete(id);
        if(!deletedveterinarian){
            return res.status(400).json("Error deleting the veterinarian");
        }
        return res.status(200).json("veterinarian Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editveterinarianController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedveterinarian = await veterinarianModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedveterinarian){
            return res.status(400).json("Error editing the veterinarian");
        }
        return res.status(200).json(updatedveterinarian);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYveterinarianController = async(req, res) => {
    const email = req.email;
    try {
        const veterinarians = await veterinarianModel.find({email: email});
        if(!veterinarians){
            return res.status(400).json("Error getting your veterinarians");
        }
        return res.status(200).json(veterinarians);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}