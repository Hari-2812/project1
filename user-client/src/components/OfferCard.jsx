import { useNavigate } from "react-router-dom";

export default function OfferCard({ offer }) {
  const navigate = useNavigate();

  return (
    <div className="offer-card">
      <img src={offer.image} alt={offer.title} />

      <div className="offer-content">
        <span className="offer-badge">{offer.discountText}</span>

        <h3>{offer.title}</h3>
        <p>{offer.description}</p>

        <p className="offer-expiry">
          Valid till: {new Date(offer.expiry).toDateString()}
        </p>

        <button onClick={() => navigate("/home")}>
          Shop Now
        </button>
      </div>
    </div>
  );
}
