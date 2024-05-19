import express from "express";
import authRouter from "./auth.router.js";
import animalRouter from "./animal.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/animal", animalRouter);

export default router;