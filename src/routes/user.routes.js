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
  emergencyCall,
  logout,
  uploadAvatar,
  basemap,
  registerView,
  emergencyCallView,
} from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").get(loginView).post(loginValidator, login);

router.route("/register").get(registerView).post(registerValidator, register);

router.get("/profile", ensureAuthenticated, profile);

router
  .route("/emergency-call")
  .get(ensureAuthenticated, emergencyCallView)
  .post(ensureAuthenticated, emergencyCall);

router.get("/basemap", ensureAuthenticated, basemap);

router.get("/logout", logout);

router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

export default router;
