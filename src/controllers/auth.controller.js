import { check, validationResult } from "express-validator";
import passport from "passport";
import bcrypt from "bcrypt";

import asyncHandler from "../middlewares/async.js";
import User from "../models/User.js";

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

export const register = asyncHandler(async (req, res) => {
  const { name, email, nationalID, password, confirm_password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    res.redirect("/user/register");
    return;
  }
  if (password !== confirm_password) {
    req.flash("invalid", "Passwords do not match");
    res.redirect("/user/register");
    return;
  }
  try {
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
      return res.status(400).json("You can't register now, try again later");
    }
    req.flash("success_msg", "You are now registered and can log in :)");
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});
