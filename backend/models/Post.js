import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },  // ✅ Store as ObjectId
  content: { type: String, required: true },
  imageUrl: [{ type: String }],  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Posts", PostSchema);
