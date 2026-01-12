import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import { getOffers } from "../services/offerService";
import "../styles/Offers.css";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOffers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getOffers();

      // Handle both array & { offers: [] } responses
      const list = Array.isArray(data) ? data : data.offers || [];

      // Show only active offers
      setOffers(list.filter((o) => o.isActive));
    } catch (err) {
      console.error("Offer fetch failed", err);
      setError("Unable to load offers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return <p className="offer-loading">🎁 Loading exciting offers...</p>;
  }

  if (error) {
    return (
      <div className="offer-error">
        <p>{error}</p>
        <button onClick={fetchOffers}>Retry</button>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="offer-empty">
        🎁 No offers available right now
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="offers-container">
      <h1 className="offers-title">🔥 Latest Offers</h1>

      <div className="offers-grid">
        {offers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
