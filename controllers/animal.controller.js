import express from "express";
import mongoose from "mongoose";
import { animalModel } from "../models/animal.model.js";

export const addAnimalController = async (req, res) => {
    console.log(req.file);
    const data = req.body;
    console.log(data);
    console.log(data.description);
    try {
        const newAnimal = await animalModel.create({
            animal_type: data.animal_type,
            weight: data.weight,
            description: data.description,
            color: data.color,
            price: data.price,
            location: data.location,
            photo: req.file.buffer,
            photo_originalName: req.file.originalname,
            photo_mimetype: req.file.mimetype
        });
        if (!newAnimal) {
            return res.status(400).json("Error creating new animal");
        }
        return res.status(200).json(newAnimal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAnimalController = async (req, res) => {
    const id = req.params.id;
    try {
        const animal = await animalModel.findById(id);
        if (!animal) {
            return res.status(404).json("Animal not found");
        }
        return res.status(200).json(animal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllAnimalController = async (req, res) => {
    try {
        const animal = await animalModel.find();
        if (!animal) {
            return res.status(404).json("Animals not found");
        }
        return res.status(200).json(animal);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

// export const editAnimalDetailsController = async (req, res) => {
//     const data = req.body;
//     try {
//         const updatedAnimal = await animalModel.findOneAndUpdate({ _id: data._id }, data, { new: true });
//         if(!updatedAnimal){
//             return res.status(400).json("Error updating the animal details");
//         }
//         return res.status(200).json(updatedAnimal);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(400).json(error.message);
//     }
// }