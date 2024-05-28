import express from "express";
import { addlabourController, deletelabourController, editlabourController, getAlllabourController, getlabourController, getMYlabourController } from "../controllers/labour.controller.js";

const labourRouter = express.Router();

labourRouter.post("/", addlabourController);

labourRouter.get("/all", getAlllabourController);

labourRouter.get("/my", getMYlabourController);

labourRouter.get("/:id", getlabourController);

labourRouter.delete("/:id", deletelabourController);

labourRouter.patch("/", editlabourController);


export default labourRouter;