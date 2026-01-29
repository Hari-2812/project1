import Order from "../models/Order.js"
import mongoose from "mongoose"
import { io } from "../server.js"

/* =========================
   USER — PLACE ORDER
========================= */
export const placeOrder = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { items, totalAmount } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid items" })
    }

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ message: "Invalid total amount" })
    }

    const order = await Order.create({
      user: new mongoose.Types.ObjectId(req.user._id),
      items,
      totalAmount,
      isViewedByAdmin: false,
    })

    console.log("✅ ORDER SAVED:", order._id)

    // 🔔 Notify admin in real-time
    io.emit("new-order", order)

    res.status(201).json(order)
  } catch (err) {
    console.error("❌ Order failed:", err)
    res.status(500).json({ message: "Order failed" })
  }
}

/* =========================
   ADMIN — GET ALL ORDERS
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    console.error("❌ Fetch orders error:", err)
    res.status(500).json({ message: "Failed to fetch orders" })
  }
}

/* =========================
   ADMIN — UNREAD COUNT
========================= */
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({
      isViewedByAdmin: false,
    })
    res.json({ count })
  } catch (err) {
    res.status(500).json({ message: "Failed to count orders" })
  }
}

/* =========================
   ADMIN — MARK VIEWED
========================= */
export const markViewed = async (req, res) => {
  try {
    await Order.updateMany(
      { isViewedByAdmin: false },
      { isViewedByAdmin: true }
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: "Failed to update orders" })
  }
}

/* =========================
   ADMIN — GET ORDER BY ID ✅ (NEW)
========================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (err) {
    console.error("❌ Fetch order error:", err)
    res.status(500).json({ message: "Failed to fetch order" })
  }
}

/* =========================
   ADMIN — UPDATE ORDER STATUS ✅ (NEW)
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ message: "Status is required" })
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.orderStatus = status
    await order.save()

    // 🔔 Optional: notify frontend
    io.emit("order-status-updated", {
      orderId: order._id,
      status,
    })

    res.json({ message: "Order status updated successfully" })
  } catch (err) {
    console.error("❌ Update status error:", err)
    res.status(500).json({ message: "Failed to update order status" })
  }
}
