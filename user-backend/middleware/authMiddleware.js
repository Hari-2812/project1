import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // 🔥 FIXED: Remove maxAge option - use token's own exp
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await User.findById(decoded.id).select("-password -__v");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is disabled",
      });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.name, error.message);

    switch (error.name) {
      case "TokenExpiredError":
        return res.status(401).json({
          success: false,
          message: "Session expired. Please login again.",
          expired: true,
        });
      case "JsonWebTokenError":
        return res.status(401).json({
          success: false,
          message: "Invalid authentication token",
        });
      default:
        return res.status(401).json({
          success: false,
          message: "Authentication failed",
        });
    }
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};
