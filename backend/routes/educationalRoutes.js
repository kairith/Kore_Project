import express from "express";
import Educational from "../models/educational.js";

const router = express.Router();

// ✅ POST: Create an educational post
router.post("/", async (req, res) => {
    try {
        const { title, description, content, category, contentType, mediaUrl } = req.body;

        if (!title || !content || !category || !contentType) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const newEducational = new Educational({
            title,
            description,
            content,
            category,
            contentType,
            mediaUrl
        });

        await newEducational.save();
        res.status(201).json(newEducational);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ GET: Fetch all educational posts
router.get("/", async (req, res) => {
    try {
        const educationalPosts = await Educational.find();  // Fetch from "educationals" collection
        res.status(200).json(educationalPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
