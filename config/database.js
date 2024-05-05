import mongoose from "mongoose"
import "dotenv/config"

const databaseURL = process.env.MONGODB_CONNECTION

mongoose
  .connect(databaseURL)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err))

export default mongoose
