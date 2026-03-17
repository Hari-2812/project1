import { useEffect, useState } from "react";
import axios from "axios";

export default function FAQ() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/faq`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("FAQ ERROR:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="faq-container">
      <h1>{data.title}</h1>

      {data.faqs.map((item, index) => (
        <div key={index} className="faq-item">
          <h4>{item.question}</h4>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

