import express from "express";
import { deleteAccountController, loginController, resetPasswordController, resetPasswordSendOTPController, resetPasswordVerifyOTPController, verifyEmailController, verifyOTPAndCreateAccountController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/test", (req, res) => {
    res.status(200).json("Hello, Farm Buddy !");
});

authRouter.post("/send_otp", verifyEmailController);
authRouter.post("/verify", verifyOTPAndCreateAccountController);
authRouter.post("/login", loginController);
authRouter.patch("/send_otp", resetPasswordSendOTPController);
authRouter.patch("/verify_otp", resetPasswordVerifyOTPController);
authRouter.patch("/reset_password", resetPasswordController);
authRouter.delete("/", authMiddleware , deleteAccountController);

export default authRouter;