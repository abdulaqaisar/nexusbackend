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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem('auth_token');
  //     if (!token) {
  //       alert("You are not authenticated.");
  //       return;
  //     }
  
  //     try {
  //       const response = await fetch(`${backend_Url}/application/get`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         },
  //       });
  
  //       const data = await response.json();
  
  //       if (response.ok) {
  //         console.log(data);
  //         setApplications(data);
  //       } else {
  //         console.error("Error fetching data:", data);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, [backend_Url]);
  

  const handleEditClick = (application) => {
    setSelectedApplication(application); 
    setIsPopupOpen(true);
  };

  const handleDeleteApplication = async (id) => {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      alert("You are not authenticated.");
      return;
    }
  
    try {
      const response = await fetch(`${backend_Url}/application/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setApplications(applications.filter((application) => application.id !== id));
        console.log(`Deleted application with id: ${id}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to delete application:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const handleUpdate = async (updatedData) => {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      alert("You are not authenticated.");
      return;
    }
  
    try {
      const response = await fetch(`${backend_Url}/application/update/${updatedData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedApplication = await response.json();
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === updatedApplication.id ? updatedApplication : app
          )
        );
        setIsPopupOpen(false);
        console.log("Application updated successfully:", updatedApplication);
      } else {
        const errorData = await response.json();
        console.error("Failed to update application:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
                  <tr key={app._id}>
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