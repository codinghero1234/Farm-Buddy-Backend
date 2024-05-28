import express from "express";
import { addproductController, deleteproductController, editproductController, getAllproductController, getproductController, getMYproductController } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/", addproductController);

productRouter.get("/all", getAllproductController);

productRouter.get("/my", getMYproductController);

productRouter.get("/:id", getproductController);

productRouter.delete("/:id", deleteproductController);

productRouter.patch("/", editproductController);


export default productRouter;