import { Router } from "express";
import tokenValidator from "../middlewares/token.validator.js";
import urlValidator from "../middlewares/url.validator.js";
import { urlController } from "../controllers/index.controller.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", urlController.getOneShortUrl);
urlRouter.get("/urls/open/:shortUrl", urlController.openShortUrl);

urlRouter.use(tokenValidator);

urlRouter.post("/urls/shorten", urlValidator, urlController.createShortUrl);

urlRouter.delete("/urls/:id", urlController.deleteShortUrl);

export default urlRouter;
