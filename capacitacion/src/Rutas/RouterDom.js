import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import AuthContextProvider from '../context/authContext';
import Capacitacion from '../Paginas/Capacitacion';
import Home from '../Paginas/Home';
import Login from '../Paginas/Login';
import MenuCapacitacion from '../Paginas/MenuCapacitacion';
import Registrarse from '../Paginas/Registrarse';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';

const RouterDom = () => {

   return (

      <AuthContextProvider>
         <BrowserRouter>
            <Routes>
               <Route path={RoutersLinks.Login} element={<PublicRoute />}>
                  <Route index element={<Login />} />
                  <Route path={RoutersLinks.Registrarse} element={<Registrarse />} />
               </Route>

               <Route path={RoutersLinks.Home} element={<PrivateRoute />}>
                  <Route index element={<Home />} />
                  <Route path={RoutersLinks.Menu} element={<Outlet />}>
                     <Route index element={<MenuCapacitacion />} />
                     <Route path={RoutersLinks.Capacitacion} element={<Capacitacion />} />
                  </Route>
               </Route>
            </Routes>
         </BrowserRouter>
      </AuthContextProvider>

   );
};

export default RouterDom;