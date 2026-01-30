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

    const saved = [];

    products.forEach((p, index) => {
      const files =
        req.files?.filter(
          (file) => file.fieldname === `images_${index}`
        ) || [];

      saved.push({
        ...p,
        images: files.map((f) => `/uploads/${f.filename}`),
      });
    });

    await Product.insertMany(saved);

    res.status(201).json({
      success: true,
      message: "Products added successfully",
      count: saved.length,
    });
  } catch (err) {
    console.error("BULK ADD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Bulk upload failed",
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
      products,
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
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
