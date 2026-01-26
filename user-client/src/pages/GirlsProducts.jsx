import { useEffect, useState } from "react"
import CategoryTabs from "../components/CategoryTabs"
import ProductCard from "../components/ProductCard"
import socket from "../services/socket"
import "../styles/GirlsProducts.css"

const categories = [
  "All",
  "T-Shirts",
  "Frocks",
  "Tops",
  "Skirts",
  "Jeans",
  "Jackets",
]

export default function GirlsProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [products, setProducts] = useState([])

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
    fetchProducts()

    /* 🔥 REAL-TIME LISTENER */
    socket.on("product-added", (product) => {
      // ✅ Only add Girls products
      if (product.gender === "Girls") {
        setProducts(prev => [product, ...prev])
      }
    })

    return () => socket.off("product-added")
  }, [])

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products")
    const data = await res.json()

    // ✅ Filter only Girls products
    const girlsProducts = data.filter(
      product => product.gender === "Girls"
    )

    setProducts(girlsProducts)
  }

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p => p.category === activeCategory
        )

  return (
    <div className="girls-page">
      <h1 className="girls-title">Girls Collection</h1>

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="girls-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
