import React, { useState, useEffect } from 'react';
import '../../Styles/admin/dashboard.css'
import Navbar from '../../components/Navbar';

const backend_Url = import.meta.env.VITE_BACKEND_API_SERVER_1;

const AdminDashboard = () => {
  const [view, setView] = useState('applications'); // "applications" or "students"
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (view === 'applications') {
      fetch(`${backend_Url}/application/get`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error('Error fetching applications:', error));
    } else if (view === 'students') {
      fetch(`${backend_Url}/students/get`)
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((error) => console.error('Error fetching students:', error));
    }
  }, [view]);

  const handleDeleteApplication = (id) => {
    fetch(`${backend_Url}/application/delete/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setApplications(applications.filter((application) => application.id !== id));
        } else {
          console.error('Failed to delete application');
        }
      })
      .catch((error) => console.error('Error deleting application:', error));
  };

  const handleDeleteStudent = (id) => {
    fetch(`/api/students/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setStudents(students.filter((student) => student.id !== id));
        } else {
          console.error('Failed to delete student');
        }
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <>
        <Navbar/>
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
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                        <td>{app.name}</td>
                        <td>{app.details}</td>
                        <td>
                            <button
                            onClick={() => handleDeleteApplication(app.id)}
                            >
                            Delete
                            </button>
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
                            <button
                            onClick={() => handleDeleteStudent(student.id)}
                            >
                            Delete
                            </button>
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
    </>
  );
};

export default AdminDashboard;