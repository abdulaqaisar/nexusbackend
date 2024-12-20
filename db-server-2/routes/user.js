const express = require("express");
const User = require("../models/user");
const { authenticate, authorizeAdmin } = require("../utils/auth");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get("getUsers/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("createUser/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.put("updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser || { message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("deleteUser/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
