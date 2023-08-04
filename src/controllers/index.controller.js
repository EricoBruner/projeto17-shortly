import { signIn, signUp } from "./auth.controller.js";
import { createShortUrl } from "./url.controller.js";

export const authController = { signIn, signUp };
export const urlController = { createShortUrl };
