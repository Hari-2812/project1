import express from "express";
import {
  createOffer,
  getOffers,
  toggleOffer,
} from "../controllers/offerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getOffers);

/* ADMIN */
router.post("/", authMiddleware, adminMiddleware, createOffer);
router.put("/:id/toggle", authMiddleware, adminMiddleware, toggleOffer);

export default router;
