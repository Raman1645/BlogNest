import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true },
    content:  { type: String, required: true },
    image:    { type: String }, // Cloudinary URL
    tags:     [String],
    author:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes:    [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        date:    { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
