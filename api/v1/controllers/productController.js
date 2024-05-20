import Product from "../models/product.js"
import "dotenv/config"
import crypto from "crypto"
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from "sharp"

const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

const create = async (req, res) => {
  try {
    if (req.file) {
      const uniqueImageName = () => crypto.randomBytes(32).toString("hex")
      const resizedImageBuffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueImageName(),
        Body: resizedImageBuffer,
        ContentType: req.file.mimetype,
      }

      const commmand = new PutObjectCommand(params)
      await s3.send(commmand)

      const imageUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({ ...params })
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
    const product = await Product.findById(id)

    if (product === null)
      return res.status(404).json({ message: "Product not found." })

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.status(200).json(updatedProduct)
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

    const params = {
      Bucket: process.env.BUCKET_NAME,

      // `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}
      Key: product.image.split("/").pop(), // The file name is at the end of the URL after the last slash
    }

    const commmand = new DeleteObjectCommand(params)
    await s3.send(commmand)

    await Product.findByIdAndDelete(id)

    res.status(200).json({ message: `Successfully deleted product ${id}.` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { create, findAll, findOne, update, destroy }
