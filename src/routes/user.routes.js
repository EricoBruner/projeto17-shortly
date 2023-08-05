import { Router } from "express";
import tokenValidator from "../middlewares/token.validator.js";
import { userController } from "../controllers/index.controller.js";

const userRouter = Router();

userRouter.use(tokenValidator);

userRouter.get("/users/me", userController.getAllUserShortUrls);

export default userRouter;
