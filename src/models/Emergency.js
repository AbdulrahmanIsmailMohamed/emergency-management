import { Schema, model } from "mongoose";

const emergencySchema = Schema(
  {
    type: String,
    features: [{}],
  },
  { timestamp: true }
);

const Emergency = model("Emergency", emergencySchema);
export default Emergency;
