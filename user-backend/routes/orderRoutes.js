import express from "express"
import {
  placeOrder,
  getAllOrders,
  getUnreadCount,
  markViewed,
} from "../controllers/orderController.js"

import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"

const router = express.Router()

/* USER */
router.post("/", authMiddleware, placeOrder)

/* ADMIN */
router.get("/", authMiddleware, adminMiddleware, getAllOrders)
router.get("/unread-count", authMiddleware, adminMiddleware, getUnreadCount)
router.put("/mark-viewed", authMiddleware, adminMiddleware, markViewed)

export default router
