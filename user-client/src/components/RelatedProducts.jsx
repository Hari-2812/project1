import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaShoppingCart } from "react-icons/fa";
import "../styles/productDetail.css";

const products = [
  {
    id: 1,
    name: "Kids Hoodie",
    price: 1299,
    rating: 4,
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Printed Shorts",
    price: 699,
    rating: 5,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1a4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Kids Jacket",
    price: 1599,
    rating: 4,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Cotton Pyjamas",
    price: 799,
    rating: 5,
    image: "https://images.unsplash.com/photo-1618354691438-25e1f06b5f6b?auto=format&fit=crop&w=400&q=80"
  }
];

export default function RelatedProducts() {
  const [start, setStart] = useState(0);

  const visible = products.slice(start, start + 3);

  const prev = () =>
    setStart(start === 0 ? products.length - 3 : start - 1);

  const next = () =>
    setStart(start + 3 >= products.length ? 0 : start + 1);

  return (
    <div className="pd-related">
      <h2>You may also like</h2>

      <div className="pd-related-slider">
        <button className="pd-slide-btn" onClick={prev}>
          <FaChevronLeft />
        </button>

        <div className="pd-related-grid">
          {visible.map((p) => (
            <div key={p.id} className="pd-related-card">
              <img src={p.image} alt={p.name} />

              <h4>{p.name}</h4>
              <p className="price">₹{p.price}</p>

              <div className="rating">
                {Array.from({ length: p.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <button
                className="pd-related-cart"
                onClick={() => {
                  addToCart(product);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2000);
                }}
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>

        <button className="pd-slide-btn" onClick={next}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
