import express from "express";
import { connectDB } from "./config/db.js";
import businessRoutes from "./routes/business.routes.js";
import authRoutes from "./routes/auth.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import chatRoutes from "./routes/chats.routes.js"
import dotenv from "dotenv";
import cors from "cors";
// import app from "app"
const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

dotenv.config();
connectDB();

app.use("/api/dashboard", dashboardRoutes)
app.use("/api/chat", chatRoutes)

app.use("/api/business", businessRoutes);

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.send("SETU Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});