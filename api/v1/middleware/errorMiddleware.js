import { join } from "path"

export const handleMongooseErrors = (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(400).json({ message: "Bad request: Invalid data format" })
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message)
    res.status(400).json({ message: "Validation errors", errors })
  } else {
    next(err) // Pass through other errors
  }
}

export const handleErrorStatus = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message })
  } else {
    next(err) // Pass through errors without status code
  }
}

export const handleUnexpectedErrors = (err, req, res, next) => {
  console.error(err.stack) // Log the error for debugging
  res.status(500).json({ message: "Internal server error" })
}
