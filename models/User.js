import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    avatar: {
      type: String,
      required: true,
    },
    nationalID: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const User = model("User", userSchema);
export default User;
