import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { bulkAddProducts } from "../controllers/productController.js";

const router = express.Router();

/* =========================
   ADMIN TEST
========================= */
router.get("/test", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ success: true, message: "Admin route working ✅" });
});

/* =========================
   ADMIN DASHBOARD
========================= */
router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const unreadOrders = await Order.countDocuments({ isViewedByAdmin: false });
    const pendingOrders = await Order.countDocuments({
      orderStatus: { $in: ["Placed", "Confirmed", "Shipped"] },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          orderStatus: { $ne: "Cancelled" },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalProducts = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        totalOrders,
        unreadOrders,
        pendingOrders,
        monthlyRevenue: revenue[0]?.total || 0,
        totalProducts,
      },
    });
  } catch (err) {
    console.error("ADMIN DASHBOARD ERROR:", err);
    res.status(500).json({ success: false, message: "Dashboard load failed" });
  }
});

/* =========================
   BULK PRODUCT UPLOAD
========================= */
router.post(
  "/products/bulk",
  authMiddleware,
  adminMiddleware,
  upload.any(),
  bulkAddProducts
);

export default router;
