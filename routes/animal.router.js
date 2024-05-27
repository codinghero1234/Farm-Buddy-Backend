import express from "express";
import { addAnimalController, getAllAnimalController, getAnimalController } from "../controllers/animal.controller.js";
import { uploadMemory } from "../services/file_upload.js";

const animalRouter = express.Router();

animalRouter.post("/", uploadMemory.single('file') , addAnimalController);

animalRouter.get("/all", getAllAnimalController);

animalRouter.get("/:id", getAnimalController);




export default animalRouter;