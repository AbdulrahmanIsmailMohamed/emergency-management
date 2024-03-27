import { Router } from "express";
import {
  emergencyCall,
  getEmergencies,
  getEmergency,
} from "../controllers/emergencies.controller.js";
import { ensureAuthenticated } from "../config/auth.js";

const router = Router();

router
  .use(ensureAuthenticated)
  .get("/", getEmergencies)
  .get("/:id", getEmergency)
  .post("/emergency-call", emergencyCall);

export default router;
