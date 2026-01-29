import express from "express";
import Business from "../models/BusinessProfile.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

 //SAVE or UPDATE BUSINESS
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("USER ID:", req.userId);
    console.log("BODY:", req.body);

    const existing = await Business.findOne({ owner: req.userId });

    if (existing) {
      const updated = await Business.findOneAndUpdate(
        { owner: req.userId },
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await Business.create({
      ...req.body,
      owner: req.userId,
    });

    res.json(created);

  } catch (error) {
    console.error("SAVE BUSINESS ERROR:", error);
    res.status(500).json({ message: "Failed to save profile" });
  }
});


  // GET LOGGED IN USER BUSINESS
router.get("/me", authMiddleware, async (req, res) => {
  try {
    console.log("FETCH USER ID:", req.userId);

    const business = await Business.findOne({
      owner: req.userId
    });

    if (!business) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(business);

  } catch (error) {
    console.error("FETCH BUSINESS ERROR:", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
});


export default router;
