import express from "express";
import mongoose from "mongoose";
import { labourModel } from "../models/labour.model.js";

export const addlabourController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newlabour = await labourModel.create(data);
        if (!newlabour) {
            return res.status(400).json("Error creating new labour");
        }
        return res.status(200).json(newlabour);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getlabourController = async (req, res) => {
    const id = req.params.id;
    try {
        const labour = await labourModel.findById(id);
        if (!labour) {
            return res.status(404).json("labour not found");
        }
        return res.status(200).json(labour);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAlllabourController = async (req, res) => {
    try {
        const labour = await labourModel.find();
        if (!labour) {
            return res.status(404).json("labours not found");
        }
        return res.status(200).json(labour);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deletelabourController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const labour  = await labourModel.findOne({_id: id});
        if(!labour){
            return res.status(400).json("labour not found !");
        }
        if(labour.email != email){
            return res.status(401).json("This labour is not yours , you can't delete it, only creator can delete it");
        }
        const deletedlabour = await labourModel.findByIdAndDelete(id);
        if(!deletedlabour){
            return res.status(400).json("Error deleting the labour");
        }
        return res.status(200).json("labour Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editlabourController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedlabour = await labourModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedlabour){
            return res.status(400).json("Error editing the labour");
        }
        return res.status(200).json(updatedlabour);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYlabourController = async(req, res) => {
    const email = req.email;
    try {
        const labours = await labourModel.find({email: email});
        if(!labours){
            return res.status(400).json("Error getting your labours");
        }
        return res.status(200).json(labours);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}