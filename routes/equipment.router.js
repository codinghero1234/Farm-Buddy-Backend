import express from "express";
import { addequipmentController, deleteequipmentController, editequipmentController, getAllequipmentController, getequipmentController, getMYequipmentController } from "../controllers/equipment.controller.js";

const equipmentRouter = express.Router();

equipmentRouter.post("/", addequipmentController);

equipmentRouter.get("/all", getAllequipmentController);

equipmentRouter.get("/my", getMYequipmentController);

equipmentRouter.get("/:id", getequipmentController);

equipmentRouter.delete("/:id", deleteequipmentController);

equipmentRouter.patch("/", editequipmentController);


export default equipmentRouter;