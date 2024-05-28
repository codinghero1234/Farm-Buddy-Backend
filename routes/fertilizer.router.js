import express from "express";
import { addfertilizerController, deletefertilizerController, editfertilizerController, getAllfertilizerController, getfertilizerController, getMYfertilizerController } from "../controllers/fertilizer.controller.js";

const fertilizerRouter = express.Router();

fertilizerRouter.post("/", addfertilizerController);

fertilizerRouter.get("/all", getAllfertilizerController);

fertilizerRouter.get("/my", getMYfertilizerController);

fertilizerRouter.get("/:id", getfertilizerController);

fertilizerRouter.delete("/:id", deletefertilizerController);

fertilizerRouter.patch("/", editfertilizerController);


export default fertilizerRouter;