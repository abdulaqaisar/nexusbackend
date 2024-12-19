const express = require("express");
const Analytics = require("../models/analytics");
const { authenticate } = require("../utils/auth");

const router = express.Router();
router.use(authenticate);

// CRUD Operations
router.get("/get", async (req, res) => {
  const metrics = await Analytics.find();
  res.json(metrics);
});

router.post("/post", async (req, res) => {
  const newMetric = new Analytics(req.body);
  await newMetric.save();
  res.json({ message: "Metric added successfully" });
});

router.put("/update", async (req, res) => {
  const { metricName, value } = req.body;
  const updatedMetric = await Analytics.findOneAndUpdate(
    { metricName },
    { value },
    { new: true }
  );
  res.json(updatedMetric || { message: "Metric not found" });
});

router.delete("/delete:metricName", async (req, res) => {
  await Analytics.findOneAndDelete({ metricName: req.params.metricName });
  res.json({ message: "Metric deleted successfully" });
});

module.exports = router;
