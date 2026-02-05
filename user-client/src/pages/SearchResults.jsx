import { useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results</h2>
      <p>
        Showing results for: <b>{query}</b>
      </p>

      {/* Later:
        axios.get(`/api/search?q=${query}`)
        render ProductCard here
      */}
    </div>
  );
}
