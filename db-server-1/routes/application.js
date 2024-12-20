const express = require("express");
const Application = require("../models/application"); 
const { authenticate } = require("../utils/auth");

const router = express.Router();
// router.use(authenticate);

router.get("/get", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    // console.log(req.body);
    await newApplication.save();
    res.json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error submitting application", details: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { email, firstName, lastName, dateOfBirth, gender, country, address, phoneNumber, academicInfo, previousAcademicRecord } = req.body;

  try {
    const updatedApplication = await Application.findOneAndUpdate(
      { email },
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
      return res.status(404).json({ message: "Application not found" });
    }

  } catch (error) {
    res.status(400).json({ error: "Error updating application", details: error.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndDelete({ email: req.params.id });
    if (result) {
      res.json({ message: "Application deleted successfully" });
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting application", details: error.message });
  }
});

module.exports = router;
