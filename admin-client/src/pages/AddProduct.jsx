import React, { useState } from "react";
import axios from "axios";
import "../styles/AddProduct.css";

/* ======================
   CONSTANTS
====================== */
const AGE_SIZES = [
  "2-3Y","3-4Y","4-5Y","5-6Y","6-7Y",
  "7-8Y","9-10Y","11-12Y","13-14Y","14-15Y"
];

const MAX_IMAGES = 4;

const emptyRow = () => ({
  name: "",
  gender: "Boys",
  category: "",
  price: "",
  discountPrice: "",
  sizes: [],
  description: "",
  productCode: "",
  isFeatured: false,
  images: [], // File objects
});

/* ======================
   COMPONENT
====================== */
export default function AddProduct() {
  const [rows, setRows] = useState([emptyRow()]);
  const [loading, setLoading] = useState(false);

  /* ======================
     ROW HELPERS
  ====================== */
  const updateRow = (i, key, value) => {
    const copy = [...rows];
    copy[i][key] = value;
    setRows(copy);
  };

  const addRow = () => setRows([...rows, emptyRow()]);

  const removeRow = (i) =>
    setRows(rows.length === 1 ? rows : rows.filter((_, idx) => idx !== i));

  /* ======================
     SIZE HELPERS
  ====================== */
  const addSize = (i) => {
    const copy = [...rows];
    copy[i].sizes.push({ label: AGE_SIZES[0], stock: "" });
    setRows(copy);
  };

  const updateSize = (ri, si, key, val) => {
    const copy = [...rows];
    copy[ri].sizes[si][key] =
      key === "stock" ? val.replace(/\D/g, "") : val;
    setRows(copy);
  };

  const removeSize = (ri, si) => {
    const copy = [...rows];
    copy[ri].sizes.splice(si, 1);
    setRows(copy);
  };

  /* ======================
     IMAGE HANDLER (MAX 4)
  ====================== */
  const handleFiles = (i, files) => {
    const copy = [...rows];
    copy[i].images = Array.from(files).slice(0, MAX_IMAGES);
    setRows(copy);
  };

  /* ======================
     SUBMIT (FINAL FIX)
  ====================== */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Product payload (NO images here)
      const payload = rows.map((r) => ({
        name: r.name,
        gender: r.gender,
        category: r.category,
        price: Number(r.price),
        discountPrice: r.discountPrice
          ? Number(r.discountPrice)
          : null,
        sizes: r.sizes.map((s) => ({
          label: s.label,
          stock: Number(s.stock || 0),
        })),
        description: r.description,
        productCode: r.productCode,
        isFeatured: r.isFeatured,
      }));

      const formData = new FormData();
      formData.append("products", JSON.stringify(payload));

      // ✅ IMPORTANT: use SAME field name "images"
      rows.forEach((r) => {
        r.images.forEach((img) => {
          formData.append("images", img);
        });
      });

      await axios.post(
        "http://localhost:5000/api/products/bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Products uploaded successfully");
      setRows([emptyRow()]);
    } catch (err) {
      console.error("❌ Bulk upload error:", err);
      alert(err.response?.data?.message || "❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="bulk-wrapper">
      <h2>🧵 Bulk Add Kids Products</h2>

      <form onSubmit={submit}>
        {rows.map((row, i) => (
          <div className="bulk-card" key={i}>
            <div className="grid-4">
              <input
                placeholder="Product Name"
                value={row.name}
                onChange={(e) =>
                  updateRow(i, "name", e.target.value)
                }
                required
              />

              <select
                value={row.gender}
                onChange={(e) =>
                  updateRow(i, "gender", e.target.value)
                }
              >
                <option>Boys</option>
                <option>Girls</option>
              </select>

              <input
                placeholder="Category"
                value={row.category}
                onChange={(e) =>
                  updateRow(i, "category", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={row.price}
                onChange={(e) =>
                  updateRow(i, "price", e.target.value)
                }
                required
              />
            </div>

            {/* SIZES */}
            <div className="sizes-box">
              {row.sizes.map((s, si) => (
                <div key={si} className="size-row">
                  <select
                    value={s.label}
                    onChange={(e) =>
                      updateSize(i, si, "label", e.target.value)
                    }
                  >
                    {AGE_SIZES.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>

                  <input
                    placeholder="Stock"
                    value={s.stock}
                    onChange={(e) =>
                      updateSize(i, si, "stock", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeSize(i, si)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="link-btn"
                onClick={() => addSize(i)}
              >
                + Add Age Size
              </button>
            </div>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                handleFiles(i, e.target.files)
              }
            />

            {/* IMAGE PREVIEW */}
            {row.images.length > 0 && (
              <div className="image-preview">
                {row.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                  />
                ))}
              </div>
            )}

            <textarea
              placeholder="Description"
              value={row.description}
              onChange={(e) =>
                updateRow(i, "description", e.target.value)
              }
            />

            <div className="row-actions">
              <input
                placeholder="SKU"
                value={row.productCode}
                onChange={(e) =>
                  updateRow(i, "productCode", e.target.value)
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={row.isFeatured}
                  onChange={(e) =>
                    updateRow(i, "isFeatured", e.target.checked)
                  }
                />
                Featured
              </label>

              <button
                type="button"
                onClick={() => removeRow(i)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="bulk-footer">
          <button type="button" onClick={addRow}>
            + Add Product
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload All"}
          </button>
        </div>
      </form>
    </div>
  );
}
