import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const randomAvatar = `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;

    const user = await User.create({ username, email, password, avatar: randomAvatar });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    console.log("User ID from token:", req.user?._id);
    const user = await User.findById(req.user._id).select("-password");
    const blogs = await Blog.find({ author: req.user._id });

    res.json({ user, totalBlogs: blogs.length });
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// Update user bio
// Update bio of logged-in user
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { bio, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio, avatar },
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      bio: updatedUser.bio,
      avatar: updatedUser.avatar,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



