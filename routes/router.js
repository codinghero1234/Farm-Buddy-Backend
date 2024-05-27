import express from "express";
import authRouter from "./auth.router.js";
import animalRouter from "./animal.router.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import fertilizerRouter from "./fertilizer.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/animal", authMiddleware,animalRouter);
router.use("/fertilizer", authMiddleware,fertilizerRouter);

export default router;