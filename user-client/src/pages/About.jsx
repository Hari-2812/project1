import { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/about`)
      .then((res) => setAbout(res.data))
      .catch((err) => console.error("ABOUT ERROR:", err));
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <div className="about-container">
      <h1>{about.title}</h1>
      <p>{about.description}</p>

      {about.highlights && (
        <>
          <h3>What We Offer</h3>
          <ul>
            {about.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <h3>Our Mission</h3>
      <p>{about.mission}</p>

      {about.vision && (
        <>
          <h3>Our Vision</h3>
          <p>{about.vision}</p>
        </>
      )}

      {about.whyChooseUs && (
        <>
          <h3>Why Choose Textura</h3>
          <ul>
            {about.whyChooseUs.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
