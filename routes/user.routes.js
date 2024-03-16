import { Router } from "express";

import upload from "../middlewares/multer.js";
import { ensureAuthenticated } from "../config/auth.js";
import {
  loginValidator,
  registerValidator,
} from "../utils/validators/user.validator.js";
import {
  loginView,
  profile,
  logout,
  uploadAvatar,
  getLocation,
  basemap,
  registerView,
} from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").get(loginView).post(loginValidator, login);

router.route("/register").get(registerView).post(registerValidator, register);

router.get("/profile", ensureAuthenticated, profile);

router.get("/get-location", getLocation);

router.get("/basemap", basemap);

router.post(
  "/upload-avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  uploadAvatar
);

router.get("/logout", logout);

export default router;
