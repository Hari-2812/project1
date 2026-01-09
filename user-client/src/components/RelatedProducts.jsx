const products = [
  { id: 1, name: "Kids Hoodie", price: "₹1299" },
  { id: 2, name: "Printed Shorts", price: "₹699" },
  { id: 3, name: "Summer Dress", price: "₹999" }
];

export default function RelatedProducts() {
  return (
    <section className="pd-related">
      <h2>Related Products</h2>

      <div className="pd-related-grid">
        {products.map((p) => (
          <div key={p.id} className="pd-card">
            <img src="https://via.placeholder.com/250x300" alt={p.name} />
            <p>{p.name}</p>
            <span>{p.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
