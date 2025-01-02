import React, { useState } from "react";
import '../styles/Application.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const backend_Url = import.meta.env.VITE_BACKEND_API_SERVER_1;

const Application = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    address: "",
    phoneNumber: "",
    email: "",
    academicInfo: {
      program: "",
      major: "",
      session: "",
      year: "",
    },
    previousAcademicRecord: {
      highSchool: {
        yearOfPassOut: "",
        marksPercentage: "",
      },
      college: {
        yearOfPassOut: "",
        marksPercentage: "",
      },
      university: {
        yearOfPassOut: "",
        marksPercentage: "",
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("academicInfo") || name.includes("previousAcademicRecord")) {
      const [section, field, subField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: subField
            ? {
                ...prev[section][field],
                [subField]: value,
              }
            : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        alert("You are not authenticated.");
        return;
      }    
      const response = await fetch(`${backend_Url}/application/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          country: "",
          address: "",
          phoneNumber: "",
          email: "",
          academicInfo: {
            program: "",
            major: "",
            session: "",
            year: "",
          },
          previousAcademicRecord: {
            highSchool: {
              yearOfPassOut: "",
              marksPercentage: "",
            },
            college: {
              yearOfPassOut: "",
              marksPercentage: "",
            },
            university: {
              yearOfPassOut: "",
              marksPercentage: "",
            },
          },
        });
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="application">
        <form onSubmit={handleSubmit}>
        <h1>Admission Application</h1>
        <div>
            <label>First Name:</label>
            <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Last Name:</label>
            <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Date of Birth:</label>
            <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Gender:</label>
            <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
        </div>
        <div>
            <label>Country:</label>
            <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Address:</label>
            <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Phone Number:</label>
            <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Email:</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>

        <h2 className="h2Color">Academic Information</h2>
        <div>
            <label>Program:</label>
            <input
            type="text"
            name="academicInfo.program"
            value={formData.academicInfo.program}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Major:</label>
            <input
            type="text"
            name="academicInfo.major"
            value={formData.academicInfo.major}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Session:</label>
            <input
            type="text"
            name="academicInfo.session"
            value={formData.academicInfo.session}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Year:</label>
            <input
            type="text"
            name="academicInfo.year"
            value={formData.academicInfo.year}
            onChange={handleChange}
            required
            />
        </div>

        <h2>Previous Academic Records</h2>
        <div>
            <label>High School Year of Pass Out:</label>
            <input
            type="text"
            name="previousAcademicRecord.highSchool.yearOfPassOut"
            value={formData.previousAcademicRecord.highSchool.yearOfPassOut}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>High School Marks (%):</label>
            <input
            type="number"
            name="previousAcademicRecord.highSchool.marksPercentage"
            value={formData.previousAcademicRecord.highSchool.marksPercentage}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>College Year of Pass Out:</label>
            <input
            type="text"
            name="previousAcademicRecord.college.yearOfPassOut"
            value={formData.previousAcademicRecord.college.yearOfPassOut}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>College Marks (%):</label>
            <input
            type="number"
            name="previousAcademicRecord.college.marksPercentage"
            value={formData.previousAcademicRecord.college.marksPercentage}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>University Year of Pass Out:</label>
            <input
            type="text"
            name="previousAcademicRecord.university.yearOfPassOut"
            value={formData.previousAcademicRecord.university.yearOfPassOut}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>University Marks (%):</label>
            <input
            type="number"
            name="previousAcademicRecord.university.marksPercentage"
            value={formData.previousAcademicRecord.university.marksPercentage}
            onChange={handleChange}
            required
            />
        </div>

        <button type="submit">Submit Application</button>
        </form>
    </div>
    <Footer/>
    </>
  );
};

export default Application;
