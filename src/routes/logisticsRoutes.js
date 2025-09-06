import { Router } from "express";
import {
  getLogistics,
  createLogistics,
  updateLogistics,
  deleteLogistics,
} from "../controllers/logisticsController.js";

const router = Router();

router.get("/", getLogistics);
router.post("/", createLogistics);
router.put("/:id", updateLogistics);
router.delete("/:id", deleteLogistics);

export default router;
