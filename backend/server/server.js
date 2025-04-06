import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 
import path from "path";
import { fileURLToPath } from "url";
import sgMail from "@sendgrid/mail"; 
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import chatbotRoutes from "../routes/chatBotRoutes.js"; // ✅ Default import
import userRoutes from "../routes/UserRoutes.js";
import communityRoutes from "../routes/CommunityRoutes.js";
import educationalRoutes from "../routes/educationalRoutes.js";
import authRoutes from "../routes/authRoutes.js";

// ✅ Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("✅ MONGO_URI:", process.env.MONGO_URI || "❌ MONGO_URI is undefined!");

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/educational", educationalRoutes);
app.use("/api/auth", authRoutes);

// ✅ Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token!" });
  }
};
// ✅ Profile route
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is undefined. Please check your .env file.");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

console.log("JWT_SECRET:", process.env.JWT_SECRET);
