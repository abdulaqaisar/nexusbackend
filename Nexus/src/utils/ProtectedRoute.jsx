import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      const { role } = storedData;
      console.log(role);

      if (role === 'Admin') {
        setUser(true);  
      } else {
        setUser(false);
      }
    }
  }, []);

  if (user === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
