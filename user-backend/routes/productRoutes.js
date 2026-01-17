import express from "express";
import { getProducts, addProduct, bulkAddProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, addProduct);
router.post("/bulk", protect, adminOnly, bulkAddProducts);

export default router;
