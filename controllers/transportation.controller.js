import express from "express";
import mongoose from "mongoose";
import { transportationModel } from "../models/transportation.model.js";

export const addtransportationController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newtransportation = await transportationModel.create(data);
        if (!newtransportation) {
            return res.status(400).json("Error creating new transportation");
        }
        return res.status(200).json(newtransportation);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const gettransportationController = async (req, res) => {
    const id = req.params.id;
    try {
        const transportation = await transportationModel.findById(id);
        if (!transportation) {
            return res.status(404).json("transportation not found");
        }
        return res.status(200).json(transportation);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAlltransportationController = async (req, res) => {
    try {
        const transportation = await transportationModel.find();
        if (!transportation) {
            return res.status(404).json("transportations not found");
        }
        return res.status(200).json(transportation);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deletetransportationController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const transportation  = await transportationModel.findOne({_id: id});
        if(!transportation){
            return res.status(400).json("transportation not found !");
        }
        if(transportation.email != email){
            return res.status(401).json("This transportation is not yours , you can't delete it, only creator can delete it");
        }
        const deletedtransportation = await transportationModel.findByIdAndDelete(id);
        if(!deletedtransportation){
            return res.status(400).json("Error deleting the transportation");
        }
        return res.status(200).json("transportation Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const edittransportationController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedtransportation = await transportationModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedtransportation){
            return res.status(400).json("Error editing the transportation");
        }
        return res.status(200).json(updatedtransportation);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYtransportationController = async(req, res) => {
    const email = req.email;
    try {
        const transportations = await transportationModel.find({email: email});
        if(!transportations){
            return res.status(400).json("Error getting your transportations");
        }
        return res.status(200).json(transportations);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}