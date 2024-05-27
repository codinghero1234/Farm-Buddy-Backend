import express from "express";
import { uploadMemory } from "../services/file_upload.js";
import { addNewEquipmentController, getAllEquipmentController, getEquipmentController } from "../controllers/equipment.controller.js";

const EquipmentRouter = express.Router();

EquipmentRouter.post("/", uploadMemory.single('file'), addNewEquipmentController);

EquipmentRouter.get("/all", getAllEquipmentController);

EquipmentRouter.get("/:id", getEquipmentController);

export default EquipmentRouter;