import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/productDetail.css";

const images = [
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520975922203-bc2a6e4d23c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542060748-10c28b62716c?auto=format&fit=crop&w=800&q=80",
];

export default function ImageGallery() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="pd-gallery">
      <div className="pd-image-frame">
        <img src={images[index]} alt="product" />

        <button className="pd-img-btn left" onClick={prev}>
          <FaChevronLeft />
        </button>
        <button className="pd-img-btn right" onClick={next}>
          <FaChevronRight />
        </button>
      </div>

      {/* DOTS */}
      <div className="pd-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`pd-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
