import { Router } from "express";

import auth from "./auth.routes.js";
import users from "./users.routes.js";
import emergencies from "./emergencies.routes.js";

const router = Router();

router.use("/auth", auth).use("/users", users).use("/emergencies", emergencies);

export default router;
