const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// REGISTER API

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, vehicleNumber, phone } = req.body;

    // Basic Validation

    if (!name || !email || !password || !vehicleNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Encrypt password

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,

      email,

      password: hashedPassword,

      vehicleNumber,

      phone,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
 
        const user = await User.findOne({ email });
 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
 
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
 
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
 
        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            "secret123", // Later replace with environment variable
            { expiresIn: "1h" }
        );
 
        res.json({
            message: "Login successful",
            token: token
        });
 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});