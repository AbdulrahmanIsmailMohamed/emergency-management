import { Router } from "express";

import {
  loginValidator,
  registerValidator,
} from "../utils/validators/user.validator.js";
import { loginView, registerView } from "../controllers/user.controller.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.route("/login").get(loginView).post(loginValidator, login);

router.route("/register").get(registerView).post(registerValidator, register);

export default router;
