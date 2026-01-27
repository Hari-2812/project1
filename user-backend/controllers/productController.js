import Product from "../models/Product.js";

/* =========================
   BULK ADD PRODUCTS (ADMIN)
========================= */
export const bulkAddProducts = async (req, res) => {
  try {
    const products = JSON.parse(req.body.products || "[]");

    if (!products.length) {
      return res.status(400).json({ message: "No products provided" });
    }

    const saved = [];

    products.forEach((p, index) => {
      const files = req.files?.[`images_${index}`] || [];
      p.images = files.map((f) => `/uploads/${f.filename}`);
      saved.push(p);
    });

    await Product.insertMany(saved);

    res.status(201).json({
      message: "Products added successfully",
      count: saved.length,
    });
  } catch (err) {
    console.error("❌ BULK ADD ERROR:", err);
    res.status(500).json({ message: "Bulk upload failed" });
  }
};

/* =========================
   GET PRODUCTS (USER)
========================= */
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

/* =========================
   DELETE PRODUCT (ADMIN)
========================= */
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
