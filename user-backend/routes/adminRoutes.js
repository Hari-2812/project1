import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { adminMiddleware } from "../middleware/adminMiddleware.js"
import upload from "../middleware/upload.js"

import Order from "../models/Order.js"
import Product from "../models/Product.js"

import { bulkAddProducts } from "../controllers/productController.js"

const router = express.Router()

/* =========================
   ADMIN TEST ROUTE
========================= */
router.get(
  "/test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({ message: "Admin route working ✅" })
  }
)

/* =========================
   ADMIN DASHBOARD SUMMARY
========================= */
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const unreadOrders = await Order.countDocuments({
      isViewedByAdmin: false,
    });

    const totalProducts = await Product.countDocuments();

    res.json({
      unreadOrders,
      totalOrders,
      monthlyRevenue: 0,
      pendingOrders: 0,
      totalProducts,
    });
  }
);


/* =========================
   BULK ADD PRODUCTS (ADMIN)
========================= */
router.post(
  "/products/bulk",
  authMiddleware,
  adminMiddleware,
  upload.any(),
  bulkAddProducts
)

export default router
