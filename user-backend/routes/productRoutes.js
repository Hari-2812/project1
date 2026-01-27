import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ============================
   1️⃣ GET ALL PRODUCTS (USER)
============================ */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

/* ============================
   2️⃣ BULK ADD PRODUCTS
============================ */
router.post("/bulk", upload.any(), async (req, res) => {
  try {
    const products = JSON.parse(req.body.products || "[]");

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products provided",
      });
    }

    const createdProducts = [];

    products.forEach((p, index) => {
      const files = req.files.filter(
        (f) => f.fieldname === `images_${index}`
      );

      createdProducts.push({
        name: p.name,
        gender: p.gender,
        category: p.category,
        price: Number(p.price),
        discountPrice: p.discountPrice ? Number(p.discountPrice) : null,
        sizes: Array.isArray(p.sizes)
          ? p.sizes.map((s) => ({
              label: s.label || "Default",
              stock: Number(s.stock) || 0,
            }))
          : [],
        description: p.description || "",
        productCode: p.productCode || "",
        isFeatured: Boolean(p.isFeatured),
        images: files.map((f) => `/uploads/${f.filename}`),
      });
    });

    await Product.insertMany(createdProducts);

    res.status(201).json({
      success: true,
      message: "Products uploaded successfully",
      count: createdProducts.length,
    });
  } catch (err) {
    console.error("BULK ADD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Bulk upload failed",
    });
  }
});

/* ============================
   3️⃣ GET PRODUCT BY ID
============================ */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

/* ============================
   4️⃣ UPDATE PRODUCT
============================ */
router.put("/:id", upload.any(), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /* Update basic fields */
    const fields = [
      "name",
      "gender",
      "category",
      "price",
      "discountPrice",
      "description",
      "productCode",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        product[f] = req.body[f];
      }
    });

    product.isFeatured = req.body.isFeatured === "true";

    /* Sizes */
    if (req.body.sizes) {
      try {
        const parsed = JSON.parse(req.body.sizes);
        if (Array.isArray(parsed)) {
          product.sizes = parsed.map((s) => ({
            label: s.label || "Default",
            stock: Number(s.stock) || 0,
          }));
        }
      } catch (err) {
        console.log("SIZE PARSE ERROR (IGNORED)");
      }
    }

    /* Images */
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (f) => `/uploads/${f.filename}`
      );
      product.images.push(...newImages);
    }

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

/* ============================
   5️⃣ DELETE PRODUCT
============================ */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

export default router;
