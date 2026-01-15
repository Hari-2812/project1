import "../styles/Marquee.css";

export default function Marquee() {
  return (
    <div className="mini-marquee">
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
