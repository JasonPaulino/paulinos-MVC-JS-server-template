import express from "express"
import { getProfile, updateProfile } from "../controllers/userController.js"
import isAuthenticated from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/profile", isAuthenticated, getProfile)
router.patch("/updateProfile", isAuthenticated, updateProfile)

export default router
