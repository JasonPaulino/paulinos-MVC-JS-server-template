import express from "express"
import mongoose from "./config/database.js"
import "dotenv/config"
import productRoute from "./api/v1/routes/productRoutes.js"

const app = express()
const PORT = process.env.SERVER_PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1", productRoute)

app.listen(process.env.PORT, () => {
  console.log("Server is running at port 3000")
})
