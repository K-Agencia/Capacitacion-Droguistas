import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useAuthContext } from '../context/authContext';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={RoutersLinks.Home} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;