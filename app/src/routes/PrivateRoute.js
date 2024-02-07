import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from '../Componentes/NavBar';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={RoutersLinks.Login} />;
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <div className='space'></div>
    </div>
  );
};

export default PrivateRoute;