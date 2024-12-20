const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true},

  academicInfo: {
    program: { type: String, required: true },
    major: { type: String, required: true },
    session: { type: String, required: true },
    year: { type: String, required: true },
  },

  previousAcademicRecord: {
    highSchool: {
      yearOfPassOut: { type: String, required: true },
      marksPercentage: { type: String, required: true },
    },
    college: {
      yearOfPassOut: { type: String, required: true },
      marksPercentage: { type: String, required: true },
    },
    university: {
      yearOfPassOut: { type: String, required: true },
      marksPercentage: { type: String, required: true },
    },
  },

  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
