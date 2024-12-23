import React, { useState } from "react";
import '../Styles/EditPopUp.css'

const EditPopUp = ({ initialData, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleDeepNestedChange = (e, section, subSection, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [key]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
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
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <h3>Academic Info</h3>
          <div>
            <label>Program:</label>
            <input
              type="text"
              value={formData.academicInfo.program}
              onChange={(e) =>
                handleNestedChange(e, "academicInfo", "program")
              }
            />
          </div>
          <div>
            <label>Major:</label>
            <input
              type="text"
              value={formData.academicInfo.major}
              onChange={(e) => handleNestedChange(e, "academicInfo", "major")}
            />
          </div>
          <div>
            <label>Session:</label>
            <input
              type="text"
              value={formData.academicInfo.session}
              onChange={(e) => handleNestedChange(e, "academicInfo", "session")}
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="text"
              value={formData.academicInfo.year}
              onChange={(e) => handleNestedChange(e, "academicInfo", "year")}
            />
          </div>

          <h3>Previous Academic Record</h3>
          <div>
            <h4>High School</h4>
            <label>Year of Pass Out:</label>
            <input
              type="text"
              value={formData.previousAcademicRecord.highSchool.yearOfPassOut}
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "highSchool",
                  "yearOfPassOut"
                )
              }
            />
            <label>Marks Percentage:</label>
            <input
              type="text"
              value={
                formData.previousAcademicRecord.highSchool.marksPercentage
              }
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "highSchool",
                  "marksPercentage"
                )
              }
            />
          </div>
          <div>
            <h4>College</h4>
            <label>Year of Pass Out:</label>
            <input
              type="text"
              value={formData.previousAcademicRecord.college.yearOfPassOut}
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "college",
                  "yearOfPassOut"
                )
              }
            />
            <label>Marks Percentage:</label>
            <input
              type="text"
              value={
                formData.previousAcademicRecord.college.marksPercentage
              }
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "college",
                  "marksPercentage"
                )
              }
            />
          </div>
          <div>
            <h4>University</h4>
            <label>Year of Pass Out:</label>
            <input
              type="text"
              value={formData.previousAcademicRecord.university.yearOfPassOut}
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "university",
                  "yearOfPassOut"
                )
              }
            />
            <label>Marks Percentage:</label>
            <input
              type="text"
              value={
                formData.previousAcademicRecord.university.marksPercentage
              }
              onChange={(e) =>
                handleDeepNestedChange(
                  e,
                  "previousAcademicRecord",
                  "university",
                  "marksPercentage"
                )
              }
            />
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPopUp;