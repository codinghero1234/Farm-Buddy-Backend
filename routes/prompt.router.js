import { Router } from "express";
import { addPromptController, getAllPromptsController } from "../controllers/prompt.controller.js";

const promptRouter = Router();

// add prompt
promptRouter.post("/", addPromptController);

// get all prompts
promptRouter.get("/", getAllPromptsController);

export default promptRouter;