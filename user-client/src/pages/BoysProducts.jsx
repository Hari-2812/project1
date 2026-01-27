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
  const [products, setProducts] = useState([]); // ✅ always array

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
    fetchProducts();

    socket.on("product-added", (product) => {
      setProducts((prev) => [product, ...prev]);
    });

    return () => socket.off("product-added");
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      // ✅ IMPORTANT FIX HERE
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    }
  };

  /* =========================
     FILTER LOGIC (SAFE)
  ========================= */
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) =>
            p.category === activeCategory &&
            p.gender === "Boys" // ✅ BOYS ONLY
        );

  return (
    <div className="boys-page">
      <h1 className="boys-title">Boys Collection</h1>

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="boys-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found
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
