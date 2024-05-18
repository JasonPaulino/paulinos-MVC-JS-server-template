import express from "express"
import productController from "../controllers/productController.js"
import isAuthenticated from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/products", isAuthenticated, productController.create)
router.get("/products", productController.findAll)
router.get("/products/:id", isAuthenticated, productController.findOne)
router.patch("/products/:id", isAuthenticated, productController.update)
router.delete("/products/:id", isAuthenticated, productController.destroy)

export default router
