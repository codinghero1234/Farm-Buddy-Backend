import express from "express";
import promptModel from "../models/prompt.model.js";

export const addPromptController = async(req, res) => {
    const {prompt, answer} = req.body;
   try {
    const newPrompt = await promptModel.create({
        prompt: prompt,
        answer: answer,
        email: req.email
    });
    if(!newPrompt){
        return res.status(400).json("Error adding prompt to user");
    }
    return res.status(200).json(newPrompt);
   } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
   }
}

export const getAllPromptsController = async(req, res) => {
    
    try 
    {
        const allPrompts = await promptModel.find({email: req.email});
        if(!allPrompts){
            return res.status(400).json("error getting all prompts");
        }
        return res.status(200).json(allPrompts);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}



