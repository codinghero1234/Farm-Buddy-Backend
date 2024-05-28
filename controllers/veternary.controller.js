import veternaryModel from "../models/veternary.model.js";

export const addNewveternaryController = async (req, res) => {
    console.log(req.file);
    const data = req.body;
    console.log(data);
    console.log(data.description);
    try {
        const newveternary = await veternaryModel.create({
            ...data,
            photo: req.file.buffer,
            photo_originalName: req.file.originalname,
            photo_mimetype: req.file.mimetype
        });
        if (!newveternary) {
            return res.status(400).json("Error creating new veternary");
        }
        return res.status(200).json(newveternary);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getveternaryController = async (req, res) => {
    const id = req.params.id;
    try {
        const veternary = await veternaryModel.findById(id);
        if (!veternary) {
            return res.status(404).json("veternary not found");
        }
        return res.status(200).json(veternary);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllveternaryController = async (req, res) => {
    try {
        const veternary = await veternaryModel.find();
        if (!veternary) {
            return res.status(404).json("veternarys not found");
        }
        return res.status(200).json(veternary);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}