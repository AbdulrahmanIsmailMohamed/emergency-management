import User from "../models/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";
import { APIError } from "./../utils/APIError.js";

export const profile = (req, res) => {
  res.render("user/profile");
};

export const uploadAvatar = asyncHandler(async (req, res, next) => {
  const imagePath = req.file.path;
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: "emergency/profiles",
    format: "jpg",
    public_id: `${Date.now()}-profile`,
  });
  if (!result) return next(new APIError("Your image not uploaded", 400));
  const update = await User.findByIdAndUpdate(req.user._id, {
    avatar: result.url,
  });
  if (!update) return next(new APIError("This user not exist", 404));

  res.redirect("/users/profile");
});

export const addEmergencyToFavourite = asyncHandler(async (req, res, next) => {
  const { id, name } = req.body;

  const emergencyId = parseInt(id);

  const user = await User.findById(req.user._id);
  if (!user) return new APIError("User not exist, please login", 401);

  const foundEmergencyId = user.favourites.find(
    (emergency) => emergency.id === emergencyId
  );

  if (foundEmergencyId) {
    return next(new APIError("This emergency has been added before", 400));
  } else {
    user.favourites.push({ id: emergencyId, name });
    await user.save();
    return next(new APIError("Emergency added to favorites successfully", 200));
  }
});

export const removeEmergencyfromFavourite = asyncHandler(
  async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { favourites: { _id: req.params.id } },
    });
    if (!user) {
      return next(new APIError("Not found data", 404));
    }
    return next(
      new APIError("emergency removed from your favourites successfully", 200)
    );
  }
);

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
};
