import { check } from "express-validator";

export const registerValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Your name should be more than 5 char"),

  check("email").notEmpty().isEmail().withMessage("Email Isn't valid"),

  check("password")
    .notEmpty()
    .isLength({ min: 4})
    .withMessage("You're password must be more than 4 num"),
    // .isStrongPassword()
    // .withMessage(
    //   "Your password must be have at least 8 characters long 1 uppercase & 1 lowercase & 1 special char(@$%#&) character 1 number"
    // ),
  check("nationalID")
    .notEmpty()
    .isLength({ min: 14, max: 14 })
    .withMessage("You're national ID not valid"),
];

export const loginValidator = [
  check("email").notEmpty().withMessage("Email required"),

  check("password").notEmpty().withMessage("Password required"),
];

export const updateUserValidator = [
  check("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Your name should be more than 5 char"),

  check("email").optional().isEmail().withMessage("Email Isn't valid"),

  check("nationalID")
    .optional()
    .isLength({ min: 14, max: 14 })
    .withMessage("You're national ID not valid"),
];
