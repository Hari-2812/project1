import { useState } from "react";
import { bulkUpload } from "../../services/productService";

export default function BulkUpload() {
  const [data, setData] = useState("");

  const submit = async () => {
    try {
      const parsed = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        alert("❌ JSON must be an array");
        return;
      }

      await bulkUpload(parsed);
      alert("✅ Bulk upload successful");
      setData("");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid JSON or server error");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Bulk Upload Products</h2>
      <p>Paste JSON array:</p>

      <textarea
        rows="12"
        style={{ width: "100%" }}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button onClick={submit}>Upload</button>
    </div>
  );
}
