import express from "express";
import { addtransportationController, deletetransportationController, edittransportationController, getAlltransportationController, gettransportationController, getMYtransportationController } from "../controllers/transportation.controller.js";

const transportationRouter = express.Router();

transportationRouter.post("/", addtransportationController);

transportationRouter.get("/all", getAlltransportationController);

transportationRouter.get("/my", getMYtransportationController);

transportationRouter.get("/:id", gettransportationController);

transportationRouter.delete("/:id", deletetransportationController);

transportationRouter.patch("/", edittransportationController);


export default transportationRouter;