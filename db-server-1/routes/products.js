const express = require("express");
const Product = require("../models/Product");
const { authenticate } = require("../utils/auth");

const router = express.Router();
router.use(authenticate);

router.get("/get", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/create", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({ message: "Product added successfully" });
});

router.put("/update", async (req, res) => {
  const { productName, price } = req.body;
  const updatedProduct = await Product.findOneAndUpdate(
    { productName },
    { price },
    { new: true }
  );
  res.json(updatedProduct || { message: "Product not found" });
});

router.delete("/delete:productName", async (req, res) => {
  await Product.findOneAndDelete({ productName: req.params.productName });
  res.json({ message: "Product deleted successfully" });
});

module.exports = router;
