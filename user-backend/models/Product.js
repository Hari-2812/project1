import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [String],
  sizes: [String]
})

export default mongoose.model('Product', productSchema)
