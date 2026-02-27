import { FaPlus, FaMinus } from "react-icons/fa";
import "../styles/QuantitySelector.css";

export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="qty-controls">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <FaMinus />
      </button>

      <span>{value}</span>

      <button
        onClick={() => onChange(value + 1)}
      >
        <FaPlus />
      </button>
    </div>
  );
}
