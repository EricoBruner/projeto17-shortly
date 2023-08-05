import { signIn, signUp } from "./auth.controller.js";
import { getAllUserShortUrls } from "./user.controller.js";
import {
  createShortUrl,
  getOneShortUrl,
  openShortUrl,
  deleteShortUrl,
} from "./url.controller.js";

export const authController = {
  signIn,
  signUp,
};

export const userController = {
  getAllUserShortUrls,
};

export const urlController = {
  createShortUrl,
  getOneShortUrl,
  openShortUrl,
  deleteShortUrl,
};
