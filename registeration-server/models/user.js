const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String, required: true },
  email: { type: String},
  password: { type: String, required: true },
  role: {
    type: String,
    default: "User",
  }
});
module.exports = mongoose.model("User", userSchema);
