import express from "express";
import mongoose from "mongoose";
import { equipmentModel } from "../models/equipment.model.js";

export const addequipmentController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newequipment = await equipmentModel.create(data);
        if (!newequipment) {
            return res.status(400).json("Error creating new equipment");
        }
        return res.status(200).json(newequipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getequipmentController = async (req, res) => {
    const id = req.params.id;
    try {
        const equipment = await equipmentModel.findById(id);
        if (!equipment) {
            return res.status(404).json("equipment not found");
        }
        return res.status(200).json(equipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllequipmentController = async (req, res) => {
    try {
        const equipment = await equipmentModel.find();
        if (!equipment) {
            return res.status(404).json("equipments not found");
        }
        return res.status(200).json(equipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deleteequipmentController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const equipment  = await equipmentModel.findOne({_id: id});
        if(!equipment){
            return res.status(400).json("equipment not found !");
        }
        if(equipment.email != email){
            return res.status(401).json("This equipment is not yours , you can't delete it, only creator can delete it");
        }
        const deletedequipment = await equipmentModel.findByIdAndDelete(id);
        if(!deletedequipment){
            return res.status(400).json("Error deleting the equipment");
        }
        return res.status(200).json("equipment Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editequipmentController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedequipment = await equipmentModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedequipment){
            return res.status(400).json("Error editing the equipment");
        }
        return res.status(200).json(updatedequipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYequipmentController = async(req, res) => {
    const email = req.email;
    try {
        const equipments = await equipmentModel.find({email: email});
        if(!equipments){
            return res.status(400).json("Error getting your equipments");
        }
        return res.status(200).json(equipments);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}