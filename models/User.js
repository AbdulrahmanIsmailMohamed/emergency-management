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
      minLength: 8,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiFdEPVQn9Hf_UkVTOco2_3_jHpfiR_jVYbA&usqp=CAU",
    },
    nationalID: {
      type: String,
      required: true,
    },
    longLat: {
      type: [String],
    },
  },
  { timestamp: true }
);

const User = model("User", userSchema);
export default User;
