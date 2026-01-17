import { useState } from "react";
import { addProduct } from "../../services/productService";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "boys",
    price: "",
    stock: "",
    sizes: "",
    image: ""
  });

  const submit = async () => {
    if (!product.name || !product.price) {
      alert("Name & price required");
      return;
    }

    await addProduct({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      sizes: product.sizes.split(",").map(s => s.trim())
    });

    alert("✅ Product added");
    setProduct({
      name: "",
      category: "boys",
      price: "",
      stock: "",
      sizes: "",
      image: ""
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Add Product</h2>

      <input
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <select
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      >
        <option value="boys">Boys</option>
        <option value="girls">Girls</option>
      </select>

      <input
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />

      <input
        placeholder="Stock"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
      />

      <input
        placeholder="Sizes (S,M,L)"
        value={product.sizes}
        onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
      />

      <input
        placeholder="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />

      <button onClick={submit}>Save Product</button>
    </div>
  );
}
