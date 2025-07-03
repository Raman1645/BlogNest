import express from "express";
import { registerUser, loginUser, getProfile, getUserProfile, updateProfile } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/user/profile", protect, getUserProfile);
router.put("/update/profile", protect, updateProfile);

export default router;
