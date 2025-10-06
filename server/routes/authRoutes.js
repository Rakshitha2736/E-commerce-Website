const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validation
  if (!name || !email || !phone || !password) {
    console.log("❌ Signup failed: Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Signup failed: Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({ name, email, phone, password });
    await user.save();

    console.log("✅ Signup successful for:", email);
    return res.json({ message: "Signup successful" });

  } catch (err) {
    console.error("🔥 Signup error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  const identifier = username || email;

  if (!identifier || !password) {
    console.log("❌ Login failed: Missing fields");
    return res.status(400).json({ message: "Username/Email and Password required" });
  }

  try {
    // find by username OR email
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    console.log("🔍 User found in DB:", user);

    if (!user) {
      console.log("❌ Login failed: User not found:", identifier);
      return res.status(400).json({ message: "User not found" });
    }

    // Support both plaintext and bcrypt-hashed passwords
    let passwordMatches = false;
    if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$'))) {
      try {
        const bcrypt = require('bcrypt');
        passwordMatches = await bcrypt.compare(password, user.password);
      } catch (e) {
        console.warn('bcrypt compare failed or bcrypt not installed, falling back to plaintext comparison');
        passwordMatches = (user.password === password);
      }
    } else {
      passwordMatches = (user.password === password);
    }

    if (!passwordMatches) {
      console.log("❌ Login failed: Invalid password for:", identifier);
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ Login successful for:", identifier);
    return res.json({
      message: "Login successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error("🔥 Login error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================== GET ALL USERS ==================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email phone"); // only return selected fields
    console.log("📋 Users fetched:", users.length);
    return res.json(users);
  } catch (error) {
    console.error("🔥 Error fetching users:", error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
