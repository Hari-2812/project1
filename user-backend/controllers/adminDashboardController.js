import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
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
};
