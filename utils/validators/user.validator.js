import { check } from "express-validator";

export const registerValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Name should be more than 5 char"),

  check("email").notEmpty().isEmail().withMessage("Email Isn't valid"),

  check("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password isn't strong"),
  check("nationalID")
    .notEmpty()
    .isLength({ min: 14, max: 14 })
    .withMessage("You're national ID not valid"),
];

export const loginValidator = [
  check("email").notEmpty().isEmail().withMessage("Email Isn't valid"),

  check("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password isn't strong")
];
