const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  metricName: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
