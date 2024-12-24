import React, { useState, useEffect } from 'react';
import '../../Styles/admin/dashboard.css';
import Navbar from '../../components/Navbar';
import EditPopUp from '../../components/EditPopUp';

const backend_Url = import.meta.env.VITE_BACKEND_API_SERVER_2;

const AdminDashboard = () => {
  const [view, setView] = useState('applications');
  const [applications, setApplications] = useState(null);
  const [students, setStudents] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('You are not authenticated.');
      return;
    }

    try {
      const response = await fetch(`${backend_Url}/applications/getApplications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setApplications(data.data);
      } else {
        setApplications(0)
        console.error('Error fetching applications:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchStudents = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('You are not authenticated.');
      return;
    }

    try {
      const response = await fetch(`${backend_Url}/users/getUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStudents(data.data);
      } else {
        setStudents(0)
        console.error('Error fetching students:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (view === 'applications' && applications === null) {
      fetchApplications();
    } else if (view === 'students' && students === null) {
      fetchStudents();
    }
  }, [view]);

  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(`${backend_Url}/applications/deleteApplication/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        setApplications(applications.filter((application) => application._id !== id));
      } else {
        console.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`${backend_Url}/users/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        setStudents(students.filter((student) => student.id !== id));
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setIsPopupOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      alert("You are not authenticated.");
      return;
    }
  
    try {
      const response = await fetch(`${backend_Url}/applications/updateApplication/${updatedData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedApplication = await response.json();
  
        // Update the applications state with the updated application
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === updatedApplication.data._id ? updatedApplication.data : app
          )
        );
  
        setIsPopupOpen(false);
        alert("Application updated successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to update application:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userData');
    alert('You have been logged out.');
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <aside className="sidebar">
          <button
            className={view === 'applications' ? 'active' : ''}
            onClick={() => setView('applications')}
          >
            Applications
          </button>
          <button
            className={view === 'students' ? 'active' : ''}
            onClick={() => setView('students')}
          >
            Students
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="content">
          {view === 'applications' && (
            <div className="applications-view">
              <h2>Applications</h2>
              {applications && applications.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id}>
                        <td>{app.firstName} {app.lastName}</td>
                        <td>{app.email}</td>
                        <td>
                          <button onClick={() => handleEditClick(app)}>View</button>
                          <button onClick={() => handleDeleteApplication(app._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : applications === null ? (
                <p>Loading...</p>
              ) : (
                <p>No applications found.</p>
              )}
            </div>
          )}

          {view === 'students' && (
            <div className="students-view">
              <h2>Registered Students</h2>
              {students && students.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : students === null ? (
                <p>Loading...</p>
              ) : (
                <p>No students found.</p>
              )}
            </div>
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

export default AdminDashboard;