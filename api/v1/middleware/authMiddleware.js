import User from "../models/user.js"

const hasActiveSession = async (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = await User.findById(req.session.userId)
    next()
  } else {
    res
      .status(401)
      .send("Unauthorized: You need to log in to access this resource.")
  }
}

export default hasActiveSession
