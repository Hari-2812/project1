import { useNavigate } from "react-router-dom";
import "../styles/Marquee.css";

export default function Marquee() {
  const navigate = useNavigate();

  return (
    <div
      className="mini-marquee"
      onClick={() => navigate("/offers")}
      role="button"
      aria-label="View offers"
    >
      <div className="mini-track">
        <span>Free Shipping on orders above ₹999</span>
        <span>New Arrivals just dropped</span>
        <span>Soft cotton • Skin friendly</span>
        <span>30% Off on winter collection</span>
        <span>Made for play. Designed for comfort.</span>

        {/* duplicate for seamless loop */}
        <span>Free Shipping on orders above ₹999</span>
        <span>New Arrivals just dropped</span>
        <span>Soft cotton • Skin friendly</span>
        <span>30% Off on winter collection</span>
        <span>Made for play. Designed for comfort.</span>
      </div>
    </div>
  );
}
