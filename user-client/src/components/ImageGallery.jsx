import { useState } from "react";

const images = [
  "https://via.placeholder.com/450x550",
  "https://via.placeholder.com/450x550/ffd1dc",
  "https://via.placeholder.com/450x550/c1e1ff"
];

export default function ImageGallery() {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="pd-gallery">
      <img src={active} alt="Product" className="pd-main-img" />

      <div className="pd-thumbs">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt="thumb"
            onClick={() => setActive(img)}
            className={active === img ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
}
