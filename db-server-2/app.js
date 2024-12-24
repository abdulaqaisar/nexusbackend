const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

const corsConfig = {
  origin: ["*"],
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));
app.use(express.json());
app.use(cors())

app.use("/users", require("./routes/user"));
app.use("/applications", require("./routes/application"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
