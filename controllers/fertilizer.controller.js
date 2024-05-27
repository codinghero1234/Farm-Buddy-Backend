import { fertilizerModel } from "../models/fertilizer.model.js";

export const addNewFertilizerController = async (req, res) => {
    console.log(req.file);
    const data = req.body;
    console.log(data);
    console.log(data.description);
    try {
        const newFertilizer = await fertilizerModel.create({
            ...data,
            photo: req.file.buffer,
            photo_originalName: req.file.originalname,
            photo_mimetype: req.file.mimetype
        });
        if (!newFertilizer) {
            return res.status(400).json("Error creating new Fertilizer");
        }
        return res.status(200).json(newFertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getFertilizerController = async (req, res) => {
    const id = req.params.id;
    try {
        const Fertilizer = await fertilizerModel.findById(id);
        if (!Fertilizer) {
            return res.status(404).json("Fertilizer not found");
        }
        return res.status(200).json(Fertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllFertilizerController = async (req, res) => {
    try {
        const Fertilizer = await fertilizerModel.find();
        if (!Fertilizer) {
            return res.status(404).json("Fertilizers not found");
        }
        return res.status(200).json(Fertilizer);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}