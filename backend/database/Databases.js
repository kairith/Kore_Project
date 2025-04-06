import mongoose from "mongoose";

// 🟢 User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "doctor"], default: "user" },
    age: { type: Number },
    phone: { type: String },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// 🟢 Chatbot Schema
const ChatbotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 🟢 Post Schema
const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now }
});

// 🟢 Comment Schema
const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 🟢 Educational Schema
const EducationalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },  
    category: { type: String, required: true }, 
    contentType: { type: String, enum: ["blog", "video"], required: true },
    mediaUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// 🟢 Notification Schema
const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// ✅ Export all models
export const User = mongoose.model("User", UserSchema);
export const Chatbot = mongoose.model("Chatbot", ChatbotSchema);
export const Post = mongoose.model("Post", PostSchema);
export const Comment = mongoose.model("Comment", CommentSchema);
export const Educational = mongoose.model("Educational", EducationalSchema);
export const Notification = mongoose.model("Notification", NotificationSchema);



