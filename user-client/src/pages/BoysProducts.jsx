import { useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import "../styles/BoysProducts.css";

const categories = [
  "All",
  "T-Shirts",
  "Shirts",
  "Shorts",
  "Jeans",
  "Jackets",
];

const products = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    category: "T-Shirts",
    price: 799,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },
  {
    id: 2,
    name: "Denim Jacket",
    category: "Jackets",
    price: 1499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
  },
  {
    id: 3,
    name: "Summer Shorts",
    category: "Shorts",
    price: 599,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e",
  },
];

export default function BoysProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <div className="boys-page">
      <h1 className="boys-title">Boys Collection</h1>

      {/* CATEGORY TABS */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      {/* PRODUCT GRID */}
      <div className="boys-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
