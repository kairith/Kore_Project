import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, 
    gender: { type: String, required: false }, // Optional
    profileImage: { type: String, required: false, default: null }, // URL for profile image
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    chatHistory: [{
        question: { type: String, required: true },
        answer: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]// Array of post IDs
});

// 🔹 Hash password before saving

const User = mongoose.model("users", UserSchema);
export default User;