import express from "express"
import { getProfile, updateProfile } from "../controllers/userController.js"
import hasActiveSession from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/profile", hasActiveSession, getProfile)
router.patch("/updateProfile", hasActiveSession, updateProfile)

export default router
