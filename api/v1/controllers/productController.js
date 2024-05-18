import Product from "../models/product.js"

const create = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      owner: req.user.id,
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findAll = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findOne = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    res.status(200).send(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    res.status(200).json({ message: `Successfully deleted product ${id}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { create, findAll, findOne, update, destroy }
