import ImageGallery from "../components/ImageGallery";
import RelatedProducts from "../components/RelatedProducts";
import "../styles/productDetail.css";

export default function ProductDetail() {
  return (
    <div className="pd-container">
      <div className="pd-main">
        <ImageGallery />

        <div className="pd-info">
          <h1 className="pd-title">Cute Cotton Kids T-Shirt</h1>
          <p className="pd-price">₹899</p>

          <p className="pd-desc">
            Soft, breathable cotton t-shirt designed for kids.
            Skin-friendly, lightweight, and perfect for daily wear.
          </p>

          {/* SIZE */}
          <div className="pd-option">
            <label>Size</label>
            <div className="pd-sizes">
              <button>S</button>
              <button>M</button>
              <button>L</button>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="pd-option">
            <label>Quantity</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <button className="pd-cart-btn">Add to Cart</button>
        </div>
      </div>

      <RelatedProducts />
    </div>
  );
}
