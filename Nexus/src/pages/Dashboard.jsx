import React, { useState, useEffect } from 'react';
import '../Styles/StudentDashboard.css';
import Navbar from '../components/Navbar';
import EditPopUp from '../components/EditPopUp';

const backend_Url = import.meta.env.VITE_BACKEND_API_SERVER_1;

const Dashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2000-01-01",
      gender: "Male",
      country: "USA",
      address: "123 Main St",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
      academicInfo: {
        program: "Bachelors",
        major: "Computer Science",
        session: "Fall",
        year: "2024",
      },
      previousAcademicRecord: {
        highSchool: {
          yearOfPassOut: "2016",
          marksPercentage: "90",
        },
        college: {
          yearOfPassOut: "2018",
          marksPercentage: "85",
        },
        university: {
          yearOfPassOut: "2022",
          marksPercentage: "88",
        },
      },
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetch(`${backend_Url}/application/get`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched applications:', data);
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  const handleEditClick = (application) => {
    setSelectedApplication(application); 
    setIsPopupOpen(true);
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter((application) => application.id !== id));
    console.log(`Deleted application with id: ${id}`);
  };

  const handleUpdate = (updatedData) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === updatedData.id ? updatedData : app
      )
    );
    setIsPopupOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        <aside className="sidebar">
          <h3>Dashboard</h3>
          <p>Welcome, Student!</p>
        </aside>
        <main className="content">
          <h2>My Applications</h2>
          {applications.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.firstName} {app.lastName}</td>
                    <td>{app.email}</td>
                    <td>
                      <button onClick={() => handleEditClick(app)}>Edit</button>
                      <button onClick={() => handleDeleteApplication(app._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No applications found.</p>
          )}
        </main>
      </div>

      {isPopupOpen && selectedApplication && (
        <EditPopUp
          initialData={selectedApplication}
          onUpdate={handleUpdate}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Dashboard;