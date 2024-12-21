const express = require("express");
const Application = require("../models/application"); 
const { authenticate } = require("../utils/auth");

const router = express.Router();
router.use(authenticate);

router.post("/create", async (req, res) => {
  try {
    const newApplication = new Application({
      ...req.body,  
      userId: req.user._id,
    });

    await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      error: "Error submitting application",
      details: error.message,
    });  
  }
});


router.get("/get", async (req, res) => {
  try {
    let applications;
        if (req.user.role !== "Admin") {
      applications = await Application.find({ userId: req.user._id })
        .populate("userId", "name email role");
      
      if (applications.length === 0) {
        return res.status(200).json([]);
      }
    } else {
      applications = await Application.find()
        .populate("userId", "name email role");
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications", details: error.message });
  }
});


router.put("/update/:id", async (req, res) => {
  const { email, firstName, lastName, dateOfBirth, gender, country, address, phoneNumber, academicInfo, previousAcademicRecord } = req.body;

  try {
    const updatedApplication = await Application.findOneAndUpdate(
      { email, userId: req.user._id },
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        country,
        address,
        phoneNumber,
        academicInfo,
        previousAcademicRecord,
      },
      { new: true }
    );

    if (updatedApplication) {
      return res.json(updatedApplication);
    } else {
      return res.status(404).json({ message: "Application not found or unauthorized" });
    }

  } catch (error) {
    res.status(400).json({ error: "Error updating application", details: error.message });
  }
});






router.delete("/delete", async (req, res) => {
  const { id } = req.query;

  try {
    let result;

    if (req.user.role === "Admin") {
      result = await Application.findByIdAndDelete(id);
    } else {
      result = await Application.findOneAndDelete({ _id: id, userId: req.user._id });
    }
    if (result) {
      res.json({ message: "Application deleted successfully" });
    } else {
      res.status(404).json({ error: "Application not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting application", details: error.message });
  }
});

module.exports = router;
