const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({
    groupNo: "123",
    nameOfGroup: "Project Team",
    members: ["Majid", "Absar", "Bilal"],
    projectTitle: "Products Server",
  });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Products Server running on ${PORT}`));
