import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const imageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Error uploading image:", err)
      res.status(500).json({ message: "Image upload failed" })
    } else {
      next()
    }
  })
}

export default imageUpload
