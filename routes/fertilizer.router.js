import express from "express";
import { uploadMemory } from "../services/file_upload.js";
import { addNewFertilizerController, getAllFertilizerController, getFertilizerController } from "../controllers/fertilizer.controller.js";

const fertilizerRouter = express.Router();

fertilizerRouter.post("/", uploadMemory.single('file'), addNewFertilizerController);

fertilizerRouter.get("/all", getAllFertilizerController);

fertilizerRouter.get("/:id", getFertilizerController);

export default fertilizerRouter;