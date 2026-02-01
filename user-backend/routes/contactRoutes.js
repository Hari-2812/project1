import express from "express";
import {
  sendContactMessage,
  getAllMessages,
} from "../controllers/contactController.js";

const router = express.Router();

// User
router.post("/", sendContactMessage);

// Admin
router.get("/", getAllMessages);

export default router;
