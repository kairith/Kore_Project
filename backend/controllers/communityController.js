import Post from '../models/Post.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Create a post
export const createPost = async (req, res) => {
  try {
    const { userId, content, imageUrl } = req.body;
    const newPost = new Post({ userId, content, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

