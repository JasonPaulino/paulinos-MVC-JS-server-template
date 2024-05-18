import bcrypt from "bcrypt"
import User from "../models/user.js"

const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()
    req.user = user
    req.session.userId = user._id
    res.status(201).send("User registered")
  } catch (error) {
    res.status(500).send("Error registering user: " + error.message)
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
      req.user = user
      req.session.userId = user._id
      res.send("User logged in")
    } else {
      res.status(401).send("Invalid credentials")
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message)
  }
}

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to logout")
      }
      res.clearCookie("connect.sid")
      res.send("User logged out")
    })
  } catch (error) {
    res.status(500).send("Error logging out: " + error.message)
  }
}

export default { register, login, logout }
