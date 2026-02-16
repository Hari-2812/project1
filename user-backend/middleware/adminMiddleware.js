export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const isAdmin =
      req.user.role === "admin" ||
      req.user.role === "Admin" ||
      req.user.isAdmin === true;

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    console.error("ADMIN MIDDLEWARE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Admin authorization failed",
    });
  }
};
