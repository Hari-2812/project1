import Order from "../models/Order.js";
import crypto from "crypto";

/* =========================
   USER: PLACE ORDER
========================= */
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    /* ---------- AUTH CHECK ---------- */
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /* ---------- VALIDATION ---------- */
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items required",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    /* ---------- CREATE ORDER ---------- */
    const order = await Order.create({
      orderId: crypto.randomUUID(),      // ✅ unique order id
      user: req.user._id,
      items,
      totalAmount,

      // 🔥 VERY IMPORTANT (MATCH MODEL & ADMIN)
      orderStatus: "Placed",
      isViewedByAdmin: false,
    });

    /* ---------- RESPONSE ---------- */
    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("PLACE ORDER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
   ADMIN: GET ALL ORDERS
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
   ADMIN: UNREAD COUNT
========================= */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({
      isViewedByAdmin: false,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    console.error("GET UNREAD COUNT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
   ADMIN: MARK VIEWED
========================= */
export const markViewed = async (req, res) => {
  try {
    await Order.updateMany(
      { isViewedByAdmin: false },
      { $set: { isViewedByAdmin: true } }
    );

    res.status(200).json({
      success: true,
      message: "Orders marked as viewed",
    });
  } catch (err) {
    console.error("MARK VIEWED ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =========================
   ADMIN: UPDATE ORDER STATUS
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Placed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("UPDATE ORDER STATUS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
