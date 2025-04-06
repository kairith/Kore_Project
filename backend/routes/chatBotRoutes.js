import express from "express";
import axios from "axios"; // ✅ Import axios for HTTP requests

const router = express.Router();

// ✅ Define the chatbot API endpoint
router.get("/ask", async (req, res) => {
  const userQuestion = req.query.q?.toLowerCase().trim();

  if (!userQuestion) {
    return res.status(400).json({ error: "Please provide a question" });
  }

  try {
    // ✅ Send user question to FastAPI's /chatbot endpoint
    const response = await fetch(`http://127.0.0.1:8000/chatbot/?question=${encodeURIComponent(question)}`);

    return res.json({ answer: response.data.response });
  } catch (error) {
    console.error("Error calling FastAPI:", error);
    return res.status(500).json({ answer: "⚠️ Error processing your question." });
  }
});

export default router;
