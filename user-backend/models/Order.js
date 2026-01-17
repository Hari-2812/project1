const orderSchema = new mongoose.Schema({
  user: Object,
  items: Array,
  total: Number,
  status: {
    type: String,
    enum: ["Placed","Packed","Shipped","Delivered"],
    default: "Placed"
  }
});

export default mongoose.model("Order", orderSchema);
