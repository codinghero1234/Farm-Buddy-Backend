import { productModel } from "../models/product.model.js";

export const addNewProductController = async (req, res) => {
    console.log(req.file);
    const data = req.body;
    console.log(data);
    console.log(data.description);
    try {
        const newProduct = await productModel.create({
            ...data,
            photo: req.file.buffer,
            photo_originalName: req.file.originalname,
            photo_mimetype: req.file.mimetype
        });
        if (!newProduct) {
            return res.status(400).json("Error creating new Product");
        }
        return res.status(200).json(newProduct);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getProductController = async (req, res) => {
    const id = req.params.id;
    try {
        const Product = await productModel.findById(id);
        if (!Product) {
            return res.status(404).json("Product not found");
        }
        return res.status(200).json(Product);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

export const getAllProductController = async (req, res) => {
    try {
        const Product = await productModel.find();
        if (!Product) {
            return res.status(404).json("Products not found");
        }
        return res.status(200).json(Product);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}