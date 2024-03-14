import validate from "validator";
import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "title can't be less 3 character"],
    maxLength: [15, "title can't be more than 15 character"],
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    validate: {
      validator: (val) => validate.isEmail(val),
      message: `{VALUE} isn't valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    validate: {
      validator: (val) => validate.isStrongPassword(val),
      message: `{PASSWORD} isn't strong password`,
    },
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);
export default User;
