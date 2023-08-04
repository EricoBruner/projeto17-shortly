import { Router } from "express";
import tokenValidator from "../middlewares/token.validator.js";
import urlValidator from "../middlewares/url.validator.js";
import { urlController } from "../controllers/index.controller.js";

const urlRouter = Router();

urlRouter.use(tokenValidator);

urlRouter.post("/urls/shorten", urlValidator, urlController.createShortUrl);

export default urlRouter;
