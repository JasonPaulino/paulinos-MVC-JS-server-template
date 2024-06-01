import express from "express"
import productController from "../controllers/productController.js"
import hasActiveSession from "../middleware/authMiddleware.js"
import isOwner from "../middleware/isOwnerMiddleware.js"
import imageUpload from "../middleware/imageUploadMiddleware.js"
import Product from "../models/product.js"

const router = express.Router()

router.post(
  "/products",
  hasActiveSession,
  imageUpload,
  productController.create
)

router.get("/products", productController.findAll)

router.get("/products/:id", hasActiveSession, productController.findOne)

router.patch(
  "/products/:id",
  hasActiveSession,
  isOwner(Product),
  productController.update
)

router.delete(
  "/products/:id",
  hasActiveSession,
  isOwner(Product),
  productController.destroy
)

export default router
