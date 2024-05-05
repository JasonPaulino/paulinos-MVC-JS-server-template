import express from "express"
import productController from "../controllers/productController.js"

const router = express.Router()

router.post("/products", productController.create)
router.get("/products", productController.findAll)
router.get("/products/:id", productController.findOne)
router.patch("/products/:id", productController.update)
router.delete("/products/:id", productController.destroy)

export default router
