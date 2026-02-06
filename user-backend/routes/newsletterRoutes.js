import express from "express";
import {
  subscribeEmail,
  sendOfferToSubscribers,
} from "../controllers/newsletterController.js";

const router = express.Router();

router.post("/subscribe", subscribeEmail);
router.post("/send-offer", sendOfferToSubscribers); // admin only

export default router;
