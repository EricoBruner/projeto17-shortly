import { signIn, signUp } from "./auth.controller.js";
import {
  createShortUrl,
  getOneShortUrl,
  openShortUrl,
} from "./url.controller.js";

export const authController = { signIn, signUp };
export const urlController = { createShortUrl, getOneShortUrl, openShortUrl };
