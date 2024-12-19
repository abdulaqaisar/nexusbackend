const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const analyticsRoutes = require("./routes/analytics");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Analytics Server",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Analytics Server running on port ${PORT}`));
