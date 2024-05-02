import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import Product from "./models/product.model.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("123")
})

app.get("/api/products/", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).send(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("Successfully connect to MongoDB")
    app.listen(3000, () => {
      console.log("Server is running at port 3000")
    })
  })
  .catch(() => console.log("Connection failed."))
