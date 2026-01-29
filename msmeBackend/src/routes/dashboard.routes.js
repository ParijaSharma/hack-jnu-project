import express from "express"
const router = express.Router()

router.get("/", async (req, res) => {

  // Later: fetch from MongoDB
  const data = {
    stats: {
      pending: 3,
      completed: 12,
      upcoming: 5,
    },
    tasks: [
      {
        title: "GST Return Filing",
        dueDate: "2026-02-15",
        status: "pending",
      }
    ],
    documents: [
      {
        name: "GST Certificate",
        date: "2026-01-10",
      }
    ],
    aiInsights: [
      {
        type: "Reminder",
        message: "Your GST return is due in 7 days"
      }
    ]
  }

  res.json(data)
})

export default router
