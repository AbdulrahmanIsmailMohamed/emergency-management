import asyncHandler from "../middlewares/asyncHandler.js";
import Emergency from "../models/Emergency.js";
import User from "../models/User.js";

export const getEmergencies = asyncHandler(async (req, res, next) => {
  const emergencies = await Emergency.find();
  if (!emergencies) return next(new APIError("Not found emergencies", 404));
  res.status(200).json(emergencies);
});

export const getEmergency = asyncHandler(async (req, res, next) => {
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
    return next(new APIError("Emergency not found for this id", 404));
  }
  res.render("emergency/emergencyPage", { emergency: emergency.features[0] });
});

export const emergencyCall = asyncHandler(async (req, res, next) => {
  const { lat, long } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      longLat: [long, lat],
    },
    { new: true }
  );
  if (!user) return next(new APIError("Can't update data", 400));
  res.json(user);
});

export const basemap = (req, res) => {
  res.render("emergency/emergency");
};
