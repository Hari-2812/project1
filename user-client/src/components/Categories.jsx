import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <div className="category-card boys" onClick={() => navigate("/boys")}>
        <div className="category-overlay">
          <h2>Boys</h2>
          <button>Shop Boys →</button>
        </div>
      </div>

      <div className="category-card girls" onClick={() => navigate("/girls")}>
        <div className="category-overlay">
          <h2>Girls</h2>
          <button>Shop Girls →</button>
        </div>
      </div>
    </section>
  );
}
