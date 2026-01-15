import { useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/NewArrivals.css";

const products = [
  /* ================= BOYS ================= */
  {
    _id: "1",
    name: "Blue Dino T-Shirt",
    image:
      "https://images.pexels.com/photos/5623856/pexels-photo-5623856.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 699,
    rating: 4.5,
    category: "boys",
  },
  {
    _id: "2",
    name: "Cool Hoodie",
    image:
      "https://images.pexels.com/photos/5698854/pexels-photo-5698854.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 999,
    rating: 4.7,
    category: "boys",
  },
  {
    _id: "3",
    name: "Cargo Joggers",
    image:
      "https://images.pexels.com/photos/5559987/pexels-photo-5559987.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 799,
    rating: 4.3,
    category: "boys",
  },
  {
    _id: "4",
    name: "Casual Shirt",
    image:
      "https://images.pexels.com/photos/3932952/pexels-photo-3932952.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 899,
    rating: 4.4,
    category: "boys",
  },
  {
    _id: "5",
    name: "Denim Jacket",
    image:
      "https://images.pexels.com/photos/3662663/pexels-photo-3662663.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1299,
    rating: 4.6,
    category: "boys",
  },
  {
    _id: "6",
    name: "Sport Shorts",
    image:
      "https://images.pexels.com/photos/6347873/pexels-photo-6347873.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 499,
    rating: 4.2,
    category: "boys",
  },
  {
    _id: "7",
    name: "Graphic Tee",
    image:
      "https://images.pexels.com/photos/3662647/pexels-photo-3662647.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 599,
    rating: 4.5,
    category: "boys",
  },
  {
    _id: "8",
    name: "Winter Jacket",
    image:
      "https://images.pexels.com/photos/3662643/pexels-photo-3662643.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1499,
    rating: 4.8,
    category: "boys",
  },

  /* ================= GIRLS ================= */
  {
    _id: "9",
    name: "Pink Party Frock",
    image:
      "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 899,
    rating: 4.6,
    category: "girls",
  },
  {
    _id: "10",
    name: "Floral Dress",
    image:
      "https://images.pexels.com/photos/3661388/pexels-photo-3661388.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1099,
    rating: 4.8,
    category: "girls",
  },
  {
    _id: "11",
    name: "Cute Top",
    image:
      "https://images.pexels.com/photos/3662653/pexels-photo-3662653.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 499,
    rating: 4.4,
    category: "girls",
  },
  {
    _id: "12",
    name: "Denim Skirt",
    image:
      "https://images.pexels.com/photos/6347874/pexels-photo-6347874.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 699,
    rating: 4.3,
    category: "girls",
  },
  {
    _id: "13",
    name: "Party Gown",
    image:
      "https://images.pexels.com/photos/3662665/pexels-photo-3662665.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1499,
    rating: 4.9,
    category: "girls",
  },
  {
    _id: "14",
    name: "Casual Dress",
    image:
      "https://images.pexels.com/photos/3662660/pexels-photo-3662660.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 899,
    rating: 4.5,
    category: "girls",
  },
  {
    _id: "15",
    name: "Cute Hoodie",
    image:
      "https://images.pexels.com/photos/3662659/pexels-photo-3662659.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 999,
    rating: 4.6,
    category: "girls",
  },
  {
    _id: "16",
    name: "Leggings Set",
    image:
      "https://images.pexels.com/photos/3662656/pexels-photo-3662656.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 599,
    rating: 4.4,
    category: "girls",
  },

  /* ================= TODDLERS ================= */
  {
    _id: "17",
    name: "Soft Baby Romper",
    image:
      "https://images.pexels.com/photos/3662669/pexels-photo-3662669.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 599,
    rating: 4.9,
    category: "toddlers",
  },
  {
    _id: "18",
    name: "Cozy Pajama Set",
    image:
      "https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 699,
    rating: 4.7,
    category: "toddlers",
  },
  {
    _id: "19",
    name: "Mini Hoodie",
    image:
      "https://images.pexels.com/photos/5623858/pexels-photo-5623858.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 799,
    rating: 4.5,
    category: "toddlers",
  },
  {
    _id: "20",
    name: "Cute Bib Set",
    image:
      "https://images.pexels.com/photos/3662668/pexels-photo-3662668.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 299,
    rating: 4.6,
    category: "toddlers",
  },
  {
    _id: "21",
    name: "Baby Jacket",
    image:
      "https://images.pexels.com/photos/3662664/pexels-photo-3662664.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 899,
    rating: 4.8,
    category: "toddlers",
  },
  {
    _id: "22",
    name: "Soft Onesie",
    image:
      "https://images.pexels.com/photos/3662666/pexels-photo-3662666.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 499,
    rating: 4.7,
    category: "toddlers",
  },
  {
    _id: "23",
    name: "Baby Tracksuit",
    image:
      "https://images.pexels.com/photos/3662661/pexels-photo-3662661.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 999,
    rating: 4.8,
    category: "toddlers",
  },
  {
    _id: "24",
    name: "Warm Booties",
    image:
      "https://images.pexels.com/photos/3662662/pexels-photo-3662662.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 399,
    rating: 4.5,
    category: "toddlers",
  },
];

export default function NewArrivals() {
  const [active, setActive] = useState("boys");

  const filtered = products.filter((p) => p.category === active);

  return (
    <section className="new-arrivals">
      <h2>New Arrivals</h2>

      <div className="collection-tabs">
        <button
          className={active === "boys" ? "active" : ""}
          onClick={() => setActive("boys")}
        >
          👕 Boys
        </button>
        <button
          className={active === "girls" ? "active" : ""}
          onClick={() => setActive("girls")}
        >
          👗 Girls
        </button>
        <button
          className={active === "toddlers" ? "active" : ""}
          onClick={() => setActive("toddlers")}
        >
          🧸 Toddlers
        </button>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
