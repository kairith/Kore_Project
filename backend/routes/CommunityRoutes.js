import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// ✅ Create Post
router.post("/", async (req, res) => {
  try {
    const { userId, text, image } = req.body;
    const post = new Post({ userId, text, image });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Like Post
router.post("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
