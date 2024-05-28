import express from "express";
import { addveterinarianController, deleteveterinarianController, editveterinarianController, getAllveterinarianController, getveterinarianController, getMYveterinarianController } from "../controllers/veterinarian.controller.js";

const veterinarianRouter = express.Router();

veterinarianRouter.post("/", addveterinarianController);

veterinarianRouter.get("/all", getAllveterinarianController);

veterinarianRouter.get("/my", getMYveterinarianController);

veterinarianRouter.get("/:id", getveterinarianController);

veterinarianRouter.delete("/:id", deleteveterinarianController);

veterinarianRouter.patch("/", editveterinarianController);


export default veterinarianRouter;