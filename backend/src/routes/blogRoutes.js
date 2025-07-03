import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from "../controllers/blogController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { updateBlog } from "../controllers/blogController.js";
import { addComment } from "../controllers/blogController.js";
import { deleteComment } from "../controllers/blogController.js";
import { toggleLikeBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, upload.single("image"), createBlog);
router.delete("/:id", protect, deleteBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.post("/:id/comments", protect, addComment);
router.delete("/:blogId/comments/:commentId", protect, deleteComment);
router.post("/:id/like", protect, toggleLikeBlog);


export default router;
