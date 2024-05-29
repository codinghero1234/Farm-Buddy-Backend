import express from "express";
import authRouter from "./auth.router.js";
import animalRouter from "./animal.router.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import fertilizerRouter from "./fertilizer.router.js";
import EquipmentRouter from "./equipment.router.js";
import ProductRouter from "./product.router.js";
import transportationRouter from "./transportation.router.js";
import veternaryRouter from "./veterinarian.router.js";
import tourismRouter from "./tourism.router.js";
import labourRouter from "./labour.router.js";
import soilRouter from "./soil.router.js";
import promptRouter from "./prompt.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/animal", authMiddleware ,animalRouter);    
router.use("/fertilizer", authMiddleware,fertilizerRouter);
router.use("/equipment", authMiddleware, EquipmentRouter);
router.use("/grains", authMiddleware, ProductRouter);
router.use("/transport", authMiddleware, transportationRouter);
router.use("/veterinarian", authMiddleware, veternaryRouter);
router.use("/tourism", authMiddleware, tourismRouter);
router.use("/labour", authMiddleware, labourRouter);
router.use("/soil", authMiddleware, soilRouter);
router.use("/prompt", authMiddleware, promptRouter);

export default router;