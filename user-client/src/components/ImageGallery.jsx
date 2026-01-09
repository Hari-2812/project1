import { useState } from "react";

export default function ImageGallery() {
  // ✅ REAL IMAGE LINKS (kids clothing style)
  const images = [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    "https://images.unsplash.com/photo-1618354691438-25bc04584c23"
  ];

  const [active, setActive] = useState(images[0]);

  return (
    <div className="pd-gallery">
      {/* MAIN IMAGE */}
      <img
        src={active}
        alt="Product"
        className="pd-main-img"
      />

      {/* THUMBNAILS */}
      <div className="pd-thumbs">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            onClick={() => setActive(img)}
            className={active === img ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
}
