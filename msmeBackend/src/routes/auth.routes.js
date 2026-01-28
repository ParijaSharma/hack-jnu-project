import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyGoogleToken } from "../config/google.js";

const router = express.Router();

router.post("/google", async (req, res) => {
  console.log("GOOGLE AUTH HIT");
  console.log("BODY:", req.body);
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    const payload = await verifyGoogleToken(idToken);

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router;
