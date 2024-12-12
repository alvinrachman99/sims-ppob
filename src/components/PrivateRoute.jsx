import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateToken } from '../utils/ValidateToken';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  console.log({token})

  const isTokenValid = validateToken(token)
  
  // Jika token tidak ada, arahkan pengguna ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  } else if (token && !isTokenValid) {
    localStorage.removeItem('token'); // Hapus session token jika tidak valid
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, tampilkan halaman yang dilindungi
  return <Outlet />;
};

export default PrivateRoute;
