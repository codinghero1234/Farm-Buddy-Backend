import express from "express";
import mongoose from "mongoose";
import { animalModel } from "../models/animal.model.js";

export const addanimalController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newanimal = await animalModel.create(data);
        if (!newanimal) {
            return res.status(400).json("Error creating new animal");
        }
        return res.status(200).json(newanimal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getanimalController = async (req, res) => {
    const id = req.params.id;
    try {
        const animal = await animalModel.findById(id);
        if (!animal) {
            return res.status(404).json("animal not found");
        }
        return res.status(200).json(animal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllanimalController = async (req, res) => {
    try {
        const animal = await animalModel.find();
        if (!animal) {
            return res.status(404).json("animals not found");
        }
        return res.status(200).json(animal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deleteanimalController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const animal  = await animalModel.findOne({_id: id});
        if(!animal){
            return res.status(400).json("animal not found !");
        }
        if(animal.email != email){
            return res.status(401).json("This animal is not yours , you can't delete it, only creator can delete it");
        }
        const deletedanimal = await animalModel.findByIdAndDelete(id);
        if(!deletedanimal){
            return res.status(400).json("Error deleting the animal");
        }
        return res.status(200).json("animal Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editanimalController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedanimal = await animalModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedanimal){
            return res.status(400).json("Error editing the animal");
        }
        return res.status(200).json(updatedanimal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYanimalController = async(req, res) => {
    const email = req.email;
    try {
        const animals = await animalModel.find({email: email});
        if(!animals){
            return res.status(400).json("Error getting your animals");
        }
        return res.status(200).json(animals);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}