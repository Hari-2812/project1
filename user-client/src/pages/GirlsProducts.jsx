import { useEffect, useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import socket from "../services/socket";
import "../styles/BoysProducts.css";

const categories = [
  "All",
  "T-Shirts",
  "Shirts",
  "Shorts",
  "Jeans",
  "Jackets",
];

export default function BoysProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ 1. Added loading state

  /* =========================
      INITIAL FETCH
  ========================= */
  useEffect(() => {
    fetchProducts();

    // Listen for real-time updates
    socket.on("product-added", (product) => {
      setProducts((prev) => [product, ...prev]);
    });

    return () => socket.off("product-added");
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false); // ✅ 2. Stop loading (always runs)
    }
  };

  /* =========================
      FILTER LOGIC (FIXED)
  ========================= */
  // First, isolate ONLY boys products from the raw list
  const boysOnly = products.filter((p) => p.gender === "Boys");

  // Then filter by the selected category tab
  const filteredProducts =
    activeCategory === "All"
      ? boysOnly
      : boysOnly.filter((p) => p.category === activeCategory);

  return (
    <div className="boys-page">
      <h1 className="boys-title">Boys Collection</h1>

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="boys-grid">
        {/* ✅ 3. Loading Check to prevent flicker */}
        {loading ? (
          <div style={{ color: "white", width: "100%", textAlign: "center", marginTop: "50px" }}>
            <h2>Loading collection...</h2>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%", color: "rgba(255,255,255,0.7)" }}>
            No products found for {activeCategory}
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}