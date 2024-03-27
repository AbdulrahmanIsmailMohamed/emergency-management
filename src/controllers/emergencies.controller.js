import asyncHandler from "../middlewares/async.js";
import Emergency from "../models/Emergency.js";
import User from "../models/User.js";

export const getEmergencies = asyncHandler(async (req, res) => {
  const emergencies = await Emergency.find();
  if (!emergencies) {
    return res.status(404).json({ message: "Not found emergencies" });
  }
  res.status(200).json(emergencies);
});

export const getEmergency = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const emergency = await Emergency.findOne(
    {
      "features.id": id,
    },
    {
      "features.$": 1,
    }
  );
  if (!emergency) {
    return res.status(404).json({ message: "Emergency not found for this id" });
  }
  res.render("emergency/emergencyPage", { emergency: emergency.features[0] });
});

export const emergencyCall = asyncHandler(async (req, res) => {
  const { lat, long } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      longLat: [long, lat],
    },
    { new: true }
  );
  res.json(user);
});