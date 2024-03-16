import User from "../models/User.js";
import asyncHandler from "../middlewares/async.js";
import cloudinary from "../config/cloudinary.js";

export const loginView = (req, res) => {
  res.render("user/login");
};

export const registerView = (req, res) => {
  res.render("user/register", {
    errors: req.flash("errors"),
  });
};

export const profile = (req, res) => {
  res.render("user/profile");
};

export const basemap = (req, res) => {
  res.render("emergency/emergency");
};

export const getLocation = (req, res) => {
  res.render("emergency/getLocation");
};

export const uploadAvatar = asyncHandler(async (req, res) => {
  try {
    const imagePath = req.file.path;
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "emergency/profiles",
      format: "jpg",
      public_id: `${Date.now()}-profile`,
    });
    if (!result) return res.status(500).json("Internal Server Error!");

    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        avatar: result.url,
      },
      { new: true }
    );
    if (!update) return res.status(404).json("This user not exist");
    res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error!");
  }
});

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
};
