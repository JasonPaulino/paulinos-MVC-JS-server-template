import dotenv from "dotenv"
import mongoose from "./config/database.js"
import express from "express"
import session from "express-session"
import morgan from "morgan"
import sessionConfig from "./config/session.js"
import {
  handleErrorStatus,
  handleMongooseErrors,
  handleUnexpectedErrors,
} from "./api/v1/middleware/errorMiddleware.js"
import authRoute from "./api/v1/routes/authRoutes.js"
import productRoute from "./api/v1/routes/productRoutes.js"
import userRoute from "./api/v1/routes/userRoutes.js"
import bodyParser from "body-parser"

dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT || 8080

// Middleware
app.use(morgan("dev"))
app.use(session(sessionConfig))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// Error handling middleware
app.use(handleMongooseErrors)
app.use(handleErrorStatus)
app.use(handleUnexpectedErrors)

// Start server
app.listen(PORT, () => {
  console.log("Server is running at port 3000")
})
