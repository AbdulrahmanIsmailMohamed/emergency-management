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
  basemap,
  registerView,
} from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").get(loginView).post(loginValidator, login);

router.route("/register").get(registerView).post(registerValidator, register);

router.get("/profile", ensureAuthenticated, profile);

router.get("/basemap", ensureAuthenticated, basemap);

router.get("/logout", logout);

router.post(
  "/upload-avatar",
  upload.single("avatar"),
  ensureAuthenticated,
  uploadAvatar
);

export default router;
