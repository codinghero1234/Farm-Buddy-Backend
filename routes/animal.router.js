import express from "express";
import { addAnimalController, editAnimalDetailsController, getAnimalController } from "../controllers/animal.controller.js";
import { uploadMemory } from "../services/file_upload.js";

const animalRouter = express.Router();

animalRouter.post("/", uploadMemory.single('file') , addAnimalController);

animalRouter.get("/:id", getAnimalController);

animalRouter.patch("/details", editAnimalDetailsController);

export default animalRouter;