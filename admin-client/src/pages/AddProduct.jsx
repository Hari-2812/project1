import { useState } from "react"
import API from "../services/api"
import "../styles/AddProduct.css"

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    ageGroup: "",
    category: "",
    fabric: "",
    price: "",
    stock: "",
    description: ""
  })

  const [image, setImage] = useState(null)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const data = new FormData()
    Object.keys(form).forEach(key => data.append(key, form[key]))
    data.append("image", image)

    try {
      await API.post("/admin/products", data)
      setMessage("✅ Kids product added successfully!")
      setForm({
        name: "",
        gender: "",
        ageGroup: "",
        category: "",
        fabric: "",
        price: "",
        stock: "",
        description: ""
      })
      setImage(null)
    } catch (err) {
      setMessage("❌ Failed to add product")
    }
  }

  return (
    <div className="add-product-container">
      <form className="add-product-card" onSubmit={handleSubmit}>
        <h2>🧒 Add Kids Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Boys</option>
          <option>Girls</option>
        </select>

        <select name="ageGroup" value={form.ageGroup} onChange={handleChange} required>
          <option value="">Select Age Group</option>
          <option>0 - 3 years</option>
          <option>4 - 7 years</option>
          <option>8 - 12 years</option>
          <option>13 - 17 years</option>
        </select>

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option>T-Shirt</option>
          <option>Shirt</option>
          <option>Shorts</option>
          <option>Frock</option>
          <option>Ethnic Wear</option>
        </select>

        <select name="fabric" value={form.fabric} onChange={handleChange} required>
          <option value="">Fabric Type</option>
          <option>Cotton</option>
          <option>Organic Cotton</option>
          <option>Linen</option>
          <option>Rayon</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Add Product</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  )
}

export default AddProduct
