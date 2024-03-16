import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";

import User from "../models/User.js";
import asyncFunction from "../middlewares/async.js";

export const loginView = (req, res) => {
  res.render("user/login");
};

export const login = async (req, res, nxt) => {
  try {
    await passport.authenticate("local", {
      successRedirect: "/user/profile",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, nxt);
  } catch (error) {
    nxt(error);
  }
};

export const registerView = (req, res) => {
  res.render("user/register", {
    errors: req.flash("errors"),
  });
};

export const register = asyncFunction(async (req, res) => {
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

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      nationalID,
      password: hash,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFdEPVQn9Hf_UkVTOco2_3_jHpfiR_jVYbA&usqp=CAU",
    });

    req.flash("success_msg", "You are now registered and can log in :)");
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

export const profile = (req, res) => {
  res.render("user/profile");
};

export const basemap = (req, res) => {
  res.render("emergency/emergency");
};

export const getLocation = (req, res) => {
  res.render("emergency/getLocation");
};

export const uploadAvatar = asyncFunction(async (req, res) => {
  try {
    const newFields = {
      avatar: req.file.filename,
    };
    const update = await User.updateOne({ _id: req.user._id }, newFields);
    if (!update) return res.status(404).send("Not found");

    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
};
