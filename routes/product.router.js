import express from "express";
import { uploadMemory } from "../services/file_upload.js";
import { addNewProductController, getAllProductController, getProductController } from "../controllers/product.controller.js";

const ProductRouter = express.Router();

ProductRouter.post("/", uploadMemory.single('file'), addNewProductController);

ProductRouter.get("/all", getAllProductController);

ProductRouter.get("/:id", getProductController);

export default ProductRouter;