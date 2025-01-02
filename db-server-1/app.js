const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const applicationRoutes = require("./routes/application");
const cors = require("cors");
const logger = require("./logger");

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT' , 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));

app.use(express.json()); 

app.use("/application", applicationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    logger.error("MongoDB connection failed:", err.message);
    process.exit(1); 
  });

app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Application Server",
  });
});

app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ message: "Something went wrong, please try again later." });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Application Server running on port ${PORT}`));
