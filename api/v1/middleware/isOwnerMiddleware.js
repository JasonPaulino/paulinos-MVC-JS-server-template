const isOwner = (schema) => {
  return async (req, res, next) => {
    try {
      const item = await schema.findById(req.params.id)
      if (!item) {
        return res.status(404).send("Not Found")
      }

      if (item.owner.toString() !== req.user.id) {
        return res.status(403).send("Forbidden")
      }

      next()
    } catch (error) {
      res.status(500).send("Server Error")
    }
  }
}

export default isOwner
