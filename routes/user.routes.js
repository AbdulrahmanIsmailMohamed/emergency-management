import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.js";
import { ensureAuthenticated } from "../config/auth.js";

import {
  loginValidator,
  registerValidator,
} from "../utils/validators/user.validator.js";
import {
  loginView,
  login,
  profile,
  logout,
  uploadAvatar,
  getLocation,
  basemap,
  register,
  registerView,
} from "../controllers/user.controller.js";

router.route("/login").get(loginView).post(loginValidator, login);

router.route("/register").get(registerView).post(registerValidator, register);

router.get("/profile", ensureAuthenticated, profile);

router.get("/get-location", getLocation);

router.get("/basemap", basemap);

router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

router.get("/logout", logout);

export default router;
