const express = require("express");
const Application = require("../models/application");
const { authenticate, authorizeAdmin } = require("../utils/auth");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get("/getApplications", async (req, res) => {
  try {
    const applications = await Application.find().populate("userId", "name email");
    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.status(200).json({
      success: true,
      data: applications,
      message: "Applications retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while retrieving applications",
      error: error.message,
    });
  }
});

router.post("/createApplications", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json({
      success: true,
      data: newApplication,
      message: "Application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting application",
      error: error.message,
    });
  }
});

router.put("/updateApplication/:id", async (req, res) => {
  try {

    const { userId , ...updateFields} = req.body;
    const application = await Application.findOne({
      _id: req.params.id,
      userId: userId,
    });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found for the specified user",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true } 
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedApplication,
      message: "Application updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating application",
      error: error.message,
    });
  }
});

router.delete("/deleteApplication/:id", async (req, res) => {
  try {
    const { userId } = req.body; 
    const application = await Application.findOne({
      _id: req.params.id,
      userId: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found for the specified user",
      });
    }
    
    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting application",
      error: error.message,
    });
  }
});


module.exports = router;
