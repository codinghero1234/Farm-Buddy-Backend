import express from "express";
import { addanimalController, deleteanimalController, editanimalController, getAllanimalController, getanimalController, getMYanimalController } from "../controllers/animal.controller.js";

const animalRouter = express.Router();

animalRouter.post("/", addanimalController);

animalRouter.get("/all", getAllanimalController);

animalRouter.get("/my", getMYanimalController);

animalRouter.get("/:id", getanimalController);

animalRouter.delete("/:id", deleteanimalController);

animalRouter.patch("/", editanimalController);


export default animalRouter;