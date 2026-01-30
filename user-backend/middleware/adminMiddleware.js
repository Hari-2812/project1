export const adminMiddleware = (req, res, next) => {
  try {
    /* =========================
       Ensure authMiddleware ran
    ========================= */
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    /* =========================
       Role Check
    ========================= */
    if (req.user.role !== "admin") {
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
