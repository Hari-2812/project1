import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMicrophone,
  FaCamera,
  FaFire,
  FaTag,
  FaStore,
} from "react-icons/fa";
import "../styles/SearchBox.css";

/* 🔥 REALISTIC SEARCH DATA */
const SEARCH_DATA = {
  trending: [
    "Kids Party Wear",
    "Winter Hoodies",
    "Boys Cotton Shirts",
    "Girls Frocks",
    "School Uniforms",
  ],
  categories: [
    "Boys T-Shirts",
    "Girls Dresses",
    "Kids Jackets",
    "Baby Wear",
    "Night Wear",
    "Ethnic Wear",
  ],
  brands: [
    "Allen Solly Junior",
    "FirstCry",
    "Hopscotch",
    "Pantaloons Kids",
    "Babyhug",
  ],
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  /* 🔍 SEARCH ACTION */
  const handleSearch = (value = query) => {
    if (!value.trim()) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
    setShowSuggestions(false);
  };

  /* 🎤 VOICE SEARCH */
  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setQuery(text);
      handleSearch(text);
    };

    recognition.start();
  };

  /* 📷 IMAGE SEARCH */
  const handleImageSearch = () => {
    alert("Image search coming soon 🚀");
  };

  /* 🔁 DEBOUNCED SEARCH */
  useEffect(() => {
    if (!query) {
      setResults({});
      return;
    }

    const timer = setTimeout(() => {
      const filter = (list) =>
        list.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );

      setResults({
        categories: filter(SEARCH_DATA.categories),
        brands: filter(SEARCH_DATA.brands),
        trending: filter(SEARCH_DATA.trending),
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search kids wear, brands, styles..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() =>
            setTimeout(() => setShowSuggestions(false), 200)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
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

        <FaSearch
          className="search-action search-submit"
          title="Search"
          onClick={() => handleSearch()}
        />
      </div>

      {showSuggestions && (
        <div className="search-suggestions">
          {!query && (
            <div className="suggestion-section">
              <h4>
                <FaFire /> Trending Searches
              </h4>
              {SEARCH_DATA.trending.map((item, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onMouseDown={() => handleSearch(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {query &&
            Object.entries(results).map(
              ([section, items]) =>
                items.length > 0 && (
                  <div key={section} className="suggestion-section">
                    <h4>
                      {section === "categories" && <FaTag />}
                      {section === "brands" && <FaStore />}
                      {section === "trending" && <FaFire />}
                      {section.toUpperCase()}
                    </h4>

                    {items.map((item, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onMouseDown={() => handleSearch(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
}
