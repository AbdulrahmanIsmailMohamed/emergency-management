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

export const signupView = (req, res) => {
  res.render("user/signup", {
    errors: req.flash("errors"),
  });
};

export const signup = asyncFunction(async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    res.redirect("/user/signup");
    return;
  }

  if (password !== confirm_password) {
    req.flash("invalid", "Passwords do not match");
    res.redirect("/user/signup");
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      req.flash("error", "Email already exists");
      res.render("user/signup", { error: req.flash("error") });
      return;
    }

    const newUser = new User({
      name,
      email,
      password,
      avatar: "profile.png",
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    await newUser.save();

    req.flash("success_msg", "You are now registered and can log in :)");
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export const profile = (req, res) => {
  // res.render("user/profile");
  res.render("emergency/emergency");
};

export const uploadAvatar = asyncFunction(async (req, res) => {
  try {
    const newFields = {
      avatar: req.file.filename,
    };
    const update = await User.updateOne({ _id: req.user._id }, newFields);

    if (!update) {
      return res.status(404).send("Not found");
    }

    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
};
