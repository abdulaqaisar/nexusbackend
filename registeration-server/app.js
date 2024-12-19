const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Multi-Server Backend",
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Auth Server running on ${PORT}`));
