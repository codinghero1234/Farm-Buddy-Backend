import express from "express";
import mongoose from "mongoose";
import { fertilizerModel } from "../models/fertilizer.model.js";

export const addfertilizerController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newfertilizer = await fertilizerModel.create(data);
        if (!newfertilizer) {
            return res.status(400).json("Error creating new fertilizer");
        }
        return res.status(200).json(newfertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getfertilizerController = async (req, res) => {
    const id = req.params.id;
    try {
        const fertilizer = await fertilizerModel.findById(id);
        if (!fertilizer) {
            return res.status(404).json("fertilizer not found");
        }
        return res.status(200).json(fertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllfertilizerController = async (req, res) => {
    try {
        const fertilizer = await fertilizerModel.find();
        if (!fertilizer) {
            return res.status(404).json("fertilizers not found");
        }
        return res.status(200).json(fertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deletefertilizerController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const fertilizer  = await fertilizerModel.findOne({_id: id});
        if(!fertilizer){
            return res.status(400).json("fertilizer not found !");
        }
        if(fertilizer.email != email){
            return res.status(401).json("This fertilizer is not yours , you can't delete it, only creator can delete it");
        }
        const deletedfertilizer = await fertilizerModel.findByIdAndDelete(id);
        if(!deletedfertilizer){
            return res.status(400).json("Error deleting the fertilizer");
        }
        return res.status(200).json("fertilizer Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editfertilizerController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedfertilizer = await fertilizerModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedfertilizer){
            return res.status(400).json("Error editing the fertilizer");
        }
        return res.status(200).json(updatedfertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYfertilizerController = async(req, res) => {
    const email = req.email;
    try {
        const fertilizers = await fertilizerModel.find({email: email});
        if(!fertilizers){
            return res.status(400).json("Error getting your fertilizers");
        }
        return res.status(200).json(fertilizers);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}