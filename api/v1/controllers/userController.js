import User from "../models/user.js"
import session from "express-session"

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    })
    req.user = user
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getProfile, updateProfile }
