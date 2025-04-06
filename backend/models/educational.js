import mongoose from "mongoose";

const educationalSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        content: { type: String, required: true },
        category: { type: String, required: true },
        contentType: { type: String, required: true },
        mediaUrl: { type: String }
    },
    { timestamps: true, collection: "educationals" }  // 👈 Force the collection name
);

const Educational = mongoose.model("Educational", educationalSchema);

export default Educational;
