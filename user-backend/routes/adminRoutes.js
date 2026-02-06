import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

import { bulkAddProducts } from "../controllers/productController.js";

const router = express.Router();

/* =========================
   ADMIN TEST ROUTE
========================= */
router.get(
  "/test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({ message: "Admin route working ✅" });
  }
);

/* =========================
   ADMIN DASHBOARD SUMMARY ✅ (DYNAMIC)
========================= */
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      /* ======================
         ORDERS
      ====================== */
      const totalOrders = await Order.countDocuments();

      const unreadOrders = await Order.countDocuments({
        isViewedByAdmin: false,
      });

      const pendingOrders = await Order.countDocuments({
        orderStatus: { $in: ["Placed", "Confirmed", "Shipped"] },
      });

      /* ======================
         MONTHLY REVENUE
      ====================== */
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const revenueData = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth },
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);

      const monthlyRevenue = revenueData[0]?.total || 0;

      /* ======================
         PRODUCTS
      ====================== */
      const totalProducts = await Product.countDocuments();

      res.json({
        unreadOrders,
        totalOrders,
        monthlyRevenue,
        pendingOrders,
        totalProducts,
      });
    } catch (error) {
      console.error("❌ Dashboard stats error:", error);
      res.status(500).json({ message: "Failed to load dashboard stats" });
    }
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
);


/* =========================
   GET ALL USERS (ADMIN)
========================= */
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        total: users.length,
        users,
      });
    } catch (error) {
      console.error("❌ Fetch users error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  }
);

export default router;
