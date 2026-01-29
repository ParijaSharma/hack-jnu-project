import express from "express"
const router = express.Router()

router.post("/", async (req, res) => {
  const { message } = req.body

  const aiReply = "Hello! Your chatbot is working 🚀"

  res.json({ reply: aiReply })
})

export default router
