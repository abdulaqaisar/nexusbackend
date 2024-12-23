const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT','DELETE'],
}));

app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Root route
app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Multi-Server Backend",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth Server running on port ${PORT}`));
