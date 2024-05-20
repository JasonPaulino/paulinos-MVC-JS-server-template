import Product from "../models/product.js"
import s3 from "../../../config/s3Client.js"
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from "sharp"
import {
  generateUniqueImageName,
  getS3PutParams,
  getS3GetParams,
  getS3DeleteParams,
} from "../../../utils/s3Utils.js"

const create = async (req, res) => {
  try {
    if (req.file) {
      const uniqueImageName = generateUniqueImageName()
      const resizedImageBuffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

      const params = getS3PutParams(
        process.env.BUCKET_NAME,
        uniqueImageName,
        resizedImageBuffer,
        req.file.mimetype
      )

      const command = new PutObjectCommand(params)
      await s3.send(command)

      const imageUrl = await getSignedUrl(
        s3,
        new GetObjectCommand(
          getS3GetParams(process.env.BUCKET_NAME, uniqueImageName)
        )
      )

      req.body.image = imageUrl
    }

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
    const product = await Product.findById(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    if (product.image) {
      // Parse the URL to extract the key
      const imageUrl = new URL(product.image)
      const fileName = imageUrl.pathname.split("/").pop()

      const params = getS3DeleteParams(process.env.BUCKET_NAME, fileName)

      const command = new DeleteObjectCommand(params)

      await s3.send(command)
    }

    await Product.findByIdAndDelete(id)

    res.status(200).json({ message: `Successfully deleted product ${id}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { create, findAll, findOne, update, destroy }
