import { signIn, signUp } from "./auth.controller.js";
import {
  createShortUrl,
  getOneShortUrl,
  openShortUrl,
  deleteShortUrl,
  getAllUserShortUrls,
} from "./url.controller.js";

export const authController = {
  signIn,
  signUp,
};

export const urlController = {
  createShortUrl,
  getOneShortUrl,
  openShortUrl,
  deleteShortUrl,
  getAllUserShortUrls,
};
