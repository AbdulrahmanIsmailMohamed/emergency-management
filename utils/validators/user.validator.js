import { check } from "express-validator";
export const userValidation = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("Name should be more than 5 char"),
  check("email").isEmail().withMessage("Email Isn't valid"),

  check("password").isLength({ min: 5 }).withMessage("Password isn't strong"),
];
