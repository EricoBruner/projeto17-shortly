import { Router } from "express";
import tokenValidator from "../middlewares/token.validator.js";
import urlValidator from "../middlewares/url.validator.js";
import { urlController } from "../controllers/index.controller.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", urlController.getOneShortUrl);
urlRouter.get("/urls/open/:shortUrl", urlController.openShortUrl);

urlRouter.post(
  "/urls/shorten",
  tokenValidator,
  urlValidator,
  urlController.createShortUrl
);

urlRouter.delete("/urls/:id", tokenValidator, urlController.deleteShortUrl);

export default urlRouter;
