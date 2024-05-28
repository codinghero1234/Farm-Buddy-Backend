import express from "express";
import mongoose from "mongoose";
import { productModel } from "../models/product.model.js";

export const addproductController = async (req, res) => {
    const email = req.email;
    console.log(`${email} this is the email bro`);
    let data = req.body;
    data.email = req.email;
    try {
        const newproduct = await productModel.create(data);
        if (!newproduct) {
            return res.status(400).json("Error creating new product");
        }
        return res.status(200).json(newproduct);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getproductController = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json("product not found");
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllproductController = async (req, res) => {
    try {
        const product = await productModel.find();
        if (!product) {
            return res.status(404).json("products not found");
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const deleteproductController = async(req,res) => {
    const email = req.email;
    const id = req.params.id;
    try {
        const product  = await productModel.findOne({_id: id});
        if(!product){
            return res.status(400).json("product not found !");
        }
        if(product.email != email){
            return res.status(401).json("This product is not yours , you can't delete it, only creator can delete it");
        }
        const deletedproduct = await productModel.findByIdAndDelete(id);
        if(!deletedproduct){
            return res.status(400).json("Error deleting the product");
        }
        return res.status(200).json("product Deleted Succesfully !");
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const editproductController = async(req, res) => {
    const data = req.body;
    const email = req.email;
    try {
        if(email != data.email){
            return res.status(401).json("You don't have permission to edit this item");
        }
        const updatedproduct = await productModel.findOneAndUpdate({_id: data._id}, data, {new: true});
        if(!updatedproduct){
            return res.status(400).json("Error editing the product");
        }
        return res.status(200).json(updatedproduct);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getMYproductController = async(req, res) => {
    const email = req.email;
    try {
        const products = await productModel.find({email: email});
        if(!products){
            return res.status(400).json("Error getting your products");
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}