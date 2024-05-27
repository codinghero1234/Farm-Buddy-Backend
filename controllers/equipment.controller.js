import { equipmentModel } from "../models/equipment.model.js";

export const addNewEquipmentController = async (req, res) => {
    console.log(req.file);
    const data = req.body;
    console.log(data);
    console.log(data.description);
    try {
        const newEquipment = await equipmentModel.create({
            ...data,
            photo: req.file.buffer,
            photo_originalName: req.file.originalname,
            photo_mimetype: req.file.mimetype
        });
        if (!newEquipment) {
            return res.status(400).json("Error creating new Equipment");
        }
        return res.status(200).json(newEquipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getEquipmentController = async (req, res) => {
    const id = req.params.id;
    try {
        const Equipment = await equipmentModel.findById(id);
        if (!Equipment) {
            return res.status(404).json("Equipment not found");
        }
        return res.status(200).json(Equipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllEquipmentController = async (req, res) => {
    try {
        const Equipment = await equipmentModel.find();
        console.log("hi");
        if (!Equipment) {
            return res.status(404).json("Equipments not found");
        }
        console.log("hi");

        return res.status(200).json(Equipment);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}