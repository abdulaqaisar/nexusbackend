import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const userProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userData');
    console.log(role);
    if (!role === null) {

      if (role === 'User') {
        setUser(true);  
      } else {
        setUser(false);
      }
    } else{
      setUser(false)
    }
  }, []);

  if (user === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default userProtectedRoute;