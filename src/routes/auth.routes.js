import { Router } from "express";
import { authController } from "../controllers/index.controller.js";
import { authValidator } from "../middlewares/auth.validator.js";

const authRouter = Router();

authRouter.post("/signup", authValidator, authController.signUp);

export default authRouter;
