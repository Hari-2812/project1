import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>All Products</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
