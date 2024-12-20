const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const applicationRoutes = require("./routes/application");
const cors = require("cors");

dotenv.config();
const app = express();

const corsConfig = {
  origin: ["*"],
}

app.use(express.json());
app.use(cors(corsConfig));
app.use("/application", applicationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Application Server",
  });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Application Server running on ${PORT}`));
