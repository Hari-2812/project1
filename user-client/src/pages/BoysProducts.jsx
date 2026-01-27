import { useEffect, useState } from "react"
import CategoryTabs from "../components/CategoryTabs"
import ProductCard from "../components/ProductCard"
import socket from "../services/socket"        // ✅ ADD
import "../styles/BoysProducts.css"

const categories = [
  "All",
  "T-Shirts",
  "Shirts",
  "Shorts",
  "Jeans",
  "Jackets",
]

export default function BoysProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [products, setProducts] = useState([])   // ✅ ADD

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
    fetchProducts()

    /* 🔥 REAL-TIME LISTENER */
    socket.on("product-added", (product) => {
      setProducts(prev => [product, ...prev])
    })

    return () => socket.off("product-added")
  }, [])

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products")
    const data = await res.json()
    setProducts(data)
  }

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory)

  return (
    <div className="boys-page">
      <h1 className="boys-title">Boys Collection</h1>

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="boys-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
