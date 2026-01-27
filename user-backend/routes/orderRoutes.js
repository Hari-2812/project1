import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import { createOrder, getAllOrders } from "../controllers/orderController.js"

const router = express.Router()

router.post("/", authMiddleware, createOrder)
router.get("/", authMiddleware, adminMiddleware, getAllOrders)

export default router
