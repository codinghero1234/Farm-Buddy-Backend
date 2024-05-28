import express from "express";
import { addtourismController, deletetourismController, edittourismController, getAlltourismController, gettourismController, getMYtourismController } from "../controllers/tourism.controller.js";

const tourismRouter = express.Router();

tourismRouter.post("/", addtourismController);

tourismRouter.get("/all", getAlltourismController);

tourismRouter.get("/my", getMYtourismController);

tourismRouter.get("/:id", gettourismController);

tourismRouter.delete("/:id", deletetourismController);

tourismRouter.patch("/", edittourismController);


export default tourismRouter;