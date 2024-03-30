import { Router } from "express";

import upload from "../middlewares/multer.js";
import { ensureAuthenticated } from "../config/auth.js";
import {
  profile,
  logout,
  uploadAvatar,
  addEmergencyToFavourite,
  removeEmergencyfromFavourite,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/logout", logout);

router
  .use(ensureAuthenticated)
  .get("/profile", profile)
  .post("/upload-avatar", upload.single("avatar"), uploadAvatar)
  .patch("/favourites", addEmergencyToFavourite)
  .patch("/favourites/:id", removeEmergencyfromFavourite);

export default router;
