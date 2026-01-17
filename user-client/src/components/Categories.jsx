import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <div className="category-card boys" onClick={() => navigate("/boys")}>
        <div className="hover-overlay">
          <h2>Boys</h2>
          <span className="arrow">→</span>
        </div>
      </div>

      <div className="category-card girls" onClick={() => navigate("/girls")}>
        <div className="hover-overlay">
          <h2>Girls</h2>
          <span className="arrow">→</span>
        </div>
      </div>
    </section>
  );
}
