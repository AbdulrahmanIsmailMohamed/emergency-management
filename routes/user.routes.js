import { Router } from "express";
const router = Router();

import { userValidation } from "../utils/validators/user.validator.js";
import upload from "../middlewares/multer.js";
import { ensureAuthenticated } from "../config/auth.js";
import {
  loginView,
  login,
  signupView,
  signup,
  profile,
  logout,
  uploadAvatar,
} from "../controllers/user.controller.js";

// login
router.route("/login").get(loginView).post(login);

// signup
router.route("/signup").get(signupView).post(userValidation, signup);

// profile
router.get("/profile", ensureAuthenticated, profile);

router.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);

// logout
router.get("/logout", logout);

export default router;