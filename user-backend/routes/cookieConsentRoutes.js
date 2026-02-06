import express from "express";
import CookieConsent from "../models/CookieConsent.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   SAVE COOKIE CONSENT
========================= */
router.post("/", async (req, res) => {
  try {
    const { consent } = req.body;

    if (typeof consent !== "boolean") {
      return res.status(400).json({ message: "Invalid consent value" });
    }

    await CookieConsent.create({
      user: req.user?._id || null,
      consent,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Cookie consent error:", error);
    res.status(500).json({ message: "Failed to save consent" });
  }
});

export default router;
