import mongoose from "mongoose";
import Product from "../models/Product.js";

/* =========================
   BULK ADD PRODUCTS (ADMIN)
========================= */
export const bulkAddProducts = async (req, res) => {
  try {
    const products = JSON.parse(req.body.products || "[]");

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products provided",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    let fileIndex = 0;

    const preparedProducts = products.map((p, index) => {
      const imageCount = Number(p.imageCount) || 0;

      if (fileIndex + imageCount > req.files.length) {
        throw new Error(`Insufficient images for product ${index + 1}`);
      }

      const images = req.files
        .slice(fileIndex, fileIndex + imageCount)
        .map((file) => file.path);

      fileIndex += imageCount;

      return {
        name: p.name?.trim(),
        gender: p.gender?.toLowerCase(),
        category: p.category?.toLowerCase()?.trim(),
        price: Number(p.price),
        discountPrice: p.discountPrice ?? null,
        sizes: p.sizes || [],
        description: p.description || "",
        productCode: p.productCode || "",
        isFeatured: Boolean(p.isFeatured),
        images,
      };
    });

    if (fileIndex !== req.files.length) {
      return res.status(400).json({
        success: false,
        message: "Image count mismatch",
      });
    }

    const inserted = await Product.insertMany(preparedProducts, {
      ordered: false,
    });

    res.status(201).json({
      success: true,
      message: "Products added successfully",
      count: inserted.length,
      products: inserted.map((p) => p._id),
    });
  } catch (err) {
    console.error("BULK ADD ERROR:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Bulk upload failed",
    });
  }
};

/* =========================
   GET PRODUCTS (USER)
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products: products.map((p) => ({
        ...p.toObject(),
        images: Array.isArray(p.images) ? p.images.filter(Boolean) : [],
      })),
    });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* =========================
   DELETE PRODUCT (ADMIN)
========================= */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
