const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const User = require("../models/user");
const logger = require("../logger");
const router = express.Router();

router.post("/register", async (req, res) => {

  const { username, password, email, fullname } = req.body;
console.log(req.body)
  if (!username || !password) {
    // logger.warn("Missing required fields in registration attempt");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      logger.warn(`Attempted registration with existing username: ${username}`);
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      fullname,
    });
    await newUser.save();

    logger.info(`User registered successfully: ${username}`);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        fullname: newUser.fullname,
        id: newUser._id,
      },
    });
  } catch (err) {
    logger.error(`Error during registration for username ${username}: ${err.message}`);
    res.status(500).json({ error: "Internal server error during registration" });
  }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.createToken({ username });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error during login" });
  }
});

module.exports = router;