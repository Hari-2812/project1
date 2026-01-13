import { useState } from "react";
import { FaSearch, FaMicrophone, FaCamera } from "react-icons/fa";
import "../styles/SearchBox.css";

const suggestions = [
  "Boys T-Shirts",
  "Kids Jackets",
  "Summer Shorts",
  "Party Wear",
  "Cotton Shirts",
  "Winter Hoodies",
];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* 🎤 VOICE SEARCH */
  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      setQuery(e.results[0][0].transcript);
      setShowSuggestions(false);
    };

    recognition.start();
  };

  /* 📷 IMAGE SEARCH (Placeholder) */
  const handleImageSearch = () => {
    alert("Image search coming soon 🚀");
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search kids wear, brands, styles..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        <FaMicrophone
          className="search-action"
          title="Voice Search"
          onClick={startVoiceSearch}
        />

        <FaCamera
          className="search-action"
          title="Image Search"
          onClick={handleImageSearch}
        />
      </div>

      {/* 🔍 SUGGESTIONS */}
      {showSuggestions && query && (
        <div className="search-suggestions">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, i) => (
              <div
                key={i}
                className="suggestion-item"
                onClick={() => {
                  setQuery(item);
                  setShowSuggestions(false);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="suggestion-item muted">
              No suggestions
            </div>
          )}
        </div>
      )}
    </div>
  );
}
