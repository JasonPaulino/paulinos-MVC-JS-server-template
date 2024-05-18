import mongoose from "mongoose"
import "dotenv/config"

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err))

export default mongoose
