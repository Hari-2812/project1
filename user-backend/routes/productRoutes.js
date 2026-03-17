import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { bulkAddProducts } from "../controllers/productController.js";

const router = express.Router();

/* =====================================================
   1️⃣ GET ALL PRODUCTS (PUBLIC)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    // ✅ Safety: remove null images (old data)
    const safeProducts = products.map((p) => ({
      ...p,
      images: Array.isArray(p.images) ? p.images.filter(Boolean) : [],
    }));

    res.status(200).json({
      success: true,
      count: safeProducts.length,
      products: safeProducts,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

/* =====================================================
   2️⃣ GET PRODUCT BY ID (PUBLIC) ✅ FIXED
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Prevent ObjectId crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Remove null images
    product.images = Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : [];

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

/* =====================================================
   3️⃣ ADD PRODUCT (ADMIN ONLY – SINGLE) ✅ FIXED
===================================================== */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.any(),
  async (req, res) => {
    try {
      const {
        name,
        gender,
        category,
        price,
        discountPrice,
        description,
        productCode,
        sizes,
        isFeatured,
      } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({
          success: false,
          message: "Name, category and price are required",
        });
      }

      // ✅ SAFE image handling
      const images =
        (req.files || [])
          .map((file) => file.path)
          .filter(Boolean);

      let parsedSizes = [];
      if (sizes) {
        try {
          const temp = JSON.parse(sizes);
          if (Array.isArray(temp)) {
            parsedSizes = temp.map((s) => ({
              label: s.label || "Default",
              stock: Number(s.stock) || 0,
            }));
          }
        } catch {
          console.log("⚠️ Size parse failed (ignored)");
        }
      }

      const product = await Product.create({
        name,
        gender,
        category,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        description,
        productCode,
        isFeatured: isFeatured === "true",
        sizes: parsedSizes,
        images,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create product",
      });
    }
  }
);

/* =====================================================
   4️⃣ BULK ADD PRODUCTS (ADMIN ONLY) ✅ CORRECT
===================================================== */
router.post(
  "/bulk",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 100),
  bulkAddProducts
);

/* =====================================================
   5️⃣ UPDATE PRODUCT (ADMIN ONLY) ✅ FIXED
===================================================== */
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.any(),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const fields = [
        "name",
        "gender",
        "category",
        "price",
        "discountPrice",
        "description",
        "productCode",
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          product[field] = req.body[field];
        }
      });

      if (req.body.isFeatured !== undefined) {
        product.isFeatured = req.body.isFeatured === "true";
      }

      if (req.body.sizes) {
        try {
          const parsed = JSON.parse(req.body.sizes);
          if (Array.isArray(parsed)) {
            product.sizes = parsed.map((s) => ({
              label: s.label || "Default",
              stock: Number(s.stock) || 0,
            }));
          }
        } catch {
          console.log("⚠️ Size parse error (ignored)");
        }
      }

      // ✅ SAFE image append
      if (req.files && req.files.length > 0) {
        const newImages = req.files
          .map((file) => file.path)
          .filter(Boolean);

        product.images.push(...newImages);
      }

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }
  }
);

/* =====================================================
   6️⃣ DELETE PRODUCT (ADMIN ONLY)
===================================================== */
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }
  }
);

export default router;
