import express from "express";
import { addsoilController, deletesoilController, editsoilController, getAllsoilController, getsoilController, getMYsoilController } from "../controllers/soil.controller.js";

const soilRouter = express.Router();

soilRouter.post("/", addsoilController);

soilRouter.get("/all", getAllsoilController);

soilRouter.get("/my", getMYsoilController);

soilRouter.get("/:id", getsoilController);

soilRouter.delete("/:id", deletesoilController);

soilRouter.patch("/", editsoilController);


export default soilRouter;