import express from "express";
import { uploadMemory } from "../services/file_upload.js";
import { addNewveternaryController, getAllveternaryController, getveternaryController } from "../controllers/veternary.controller.js";

const veternaryRouter = express.Router();

veternaryRouter.post("/", uploadMemory.single('file'), addNewveternaryController);

veternaryRouter.get("/all", getAllveternaryController);

veternaryRouter.get("/:id", getveternaryController);

export default veternaryRouter;