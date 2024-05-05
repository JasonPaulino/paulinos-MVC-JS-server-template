import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    image: { type: String, required: false },
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

export default Product
