import { Router } from "express";
import {
  basemap,
  emergencyCall,
  getEmergencies,
  getEmergency,
} from "../controllers/emergencies.controller.js";
import { ensureAuthenticated } from "../config/auth.js";

const router = Router();

router
  .use(ensureAuthenticated)
  .get("/", getEmergencies)
  .post("/emergency-call", emergencyCall)
  .get("/basemap", basemap)
  .get("/:id", getEmergency);

export default router;
