import { check, validationResult } from "express-validator";
import passport from "passport";
import bcrypt from "bcrypt";

import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";

export const loginView = (req, res) => {
  res.render("user/login");
};

export const registerView = (req, res) => {
  res.render("user/register", {
    errors: req.flash("errors"),
  });
};

export const login = async (req, res, next) => {
  try {
    await passport.authenticate("local", {
      successRedirect: "/users/profile",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, nationalID, password, confirm_password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    res.redirect("/auth/register");
    return;
  }
  if (password !== confirm_password) {
    req.flash("invalid", "Passwords do not match");
    res.redirect("/auth/register");
    return;
  }
  
  const user = await User.findOne({ email });
  if (user) {
    req.flash("error", "You're email is already exist, please login");
    res.render("user/register", { error: req.flash("error") });
    return;
  }

  const newUser = await User.create({
    name,
    email,
    nationalID,
    password: bcrypt.hashSync(password, 12),
  });
  if (!newUser) {
    return next(new APIError("Can't register, try again later..", 400));
  }
  req.flash("success_msg", "You are now registered and can log in :)");
  res.redirect("/auth/login");
});
