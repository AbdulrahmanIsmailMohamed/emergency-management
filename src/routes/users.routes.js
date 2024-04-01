import { Router } from "express";

import upload from "../middlewares/multer.js";
import { ensureAuthenticated } from "../config/auth.js";
import { updateUserValidator } from "./../utils/validators/user.validator.js";
import {
  profile,
  logout,
  uploadAvatar,
  addEmergencyToFavourite,
  removeEmergencyfromFavourite,
  updateUser,
  updateUserView,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/logout", logout);

router.use(ensureAuthenticated);

router.route("/").get(updateUserView).patch(updateUserValidator, updateUser);

router
  .get("/profile", profile)
  .post("/upload-avatar", upload.single("avatar"), uploadAvatar)
  .patch("/favourites", addEmergencyToFavourite)
  .patch("/favourites/:id", removeEmergencyfromFavourite);

export default router;
