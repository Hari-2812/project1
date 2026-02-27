import "../styles/Toast.css";

export default function Toast({ message, show }) {
  if (!show) return null;

  return (
    <div className="toast">
      🛒 {message}
    </div>
  );
}
