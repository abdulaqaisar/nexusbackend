import React, { useState, useEffect } from 'react';
import '../../Styles/admin/dashboard.css';
import Navbar from '../../components/Navbar';
import EditPopUp from '../../components/EditPopUp';

const backend_Url = import.meta.env.VITE_BACKEND_API_SERVER_1;

const AdminDashboard = () => {
  const [view, setView] = useState('applications'); // "applications" or "students"
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('You are not authenticated.');
      return;
    }

    try {
      const response = await fetch(`${backend_Url}/application/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setApplications(data);
      } else {
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
      const response = await fetch(`${backend_Url}/students/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setStudents(data);
      } else {
        console.error('Error fetching students:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (view === 'applications') {
      fetchApplications();
    } else if (view === 'students') {
      fetchStudents();
    }
  }, [view]);

  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(`${backend_Url}/application/delete?id=${id}`, {
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
      const response = await fetch(`${backend_Url}/students/delete?id=${id}`, {
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

  const handleUpdate = (updatedApplication) => {
    setApplications((prev) =>
      prev.map((app) =>
        app._id === updatedApplication._id ? updatedApplication : app
      )
    );
    setIsPopupOpen(false);
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
        </aside>

        <main className="content">
          {view === 'applications' && (
            <div className="applications-view">
              <h2>Applications</h2>
              {applications.length > 0 ? (
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
              ) : (
                <p>No applications found.</p>
              )}
            </div>
          )}

          {view === 'students' && (
            <div className="students-view">
              <h2>Registered Students</h2>
              {students.length > 0 ? (
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
                          <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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