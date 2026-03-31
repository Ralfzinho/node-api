import { Router } from "express";
import {
  getBuysells,
  getBuysell,
  createNewBuysell,
  updateExistingBuysell,
  deleteExistingBuysell,
} from "../controllers/buysellController.js";

const router = Router();

router.get("/", getBuysells);
router.get("/:id", getBuysell);
router.post("/", createNewBuysell);
router.put("/:id", updateExistingBuysell);
router.delete("/:id", deleteExistingBuysell);

export default router;