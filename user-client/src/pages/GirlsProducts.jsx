import { useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import "../styles/BoysProducts.css"; // ✅ reuse same CSS

const categories = ["All", "T-Shirts", "Frocks", "Tops", "Leggings", "Jackets"];

const products = [
  {
    id: 1,
    name: "Floral Cotton Frock",
    category: "Frocks",
    price: 1299,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593032465171-8f7d06cfd3c3",
  },
  {
    id: 2,
    name: "Printed Girls T-Shirt",
    category: "T-Shirts",
    price: 699,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
  },
];

export default function GirlsProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="boys-page">
      {" "}
      {/* ✅ reuse */}
      <h1 className="boys-title">Girls Collection</h1>
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />
      <div className="boys-grid">
        {" "}
        {/* ✅ reuse */}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
