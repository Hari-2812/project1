import express from "express";
import upload from "../middleware/upload.js";
import {
  bulkAddProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* BULK ADD */
router.post("/products/bulk", upload.any(), bulkAddProducts);

/* DELETE */
router.delete("/products/:id", deleteProduct);

export default router;
