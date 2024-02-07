import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Perfil from './Perfil';
import { Imagenes } from '../Constantes/Imagenes';

import '../css/NavBar.css';

const NavBar = () => {

   return (
      <nav className='NavBar'>
         <div className="container">
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="nav-navegacion">
               <NavLink to={`/${RoutersLinks.Home}`} className={"navLink"} >Inicio</NavLink>
               <NavLink to={`/${RoutersLinks.Home}/${RoutersLinks.Menu}`} className={"navLink"} >Capacítate</NavLink>
               <a href={`${RoutersLinks.Descubre}`} className={"navLink"} >Descubre más</a>
               <Perfil />
            </div>
         </div>

         <div className="nav-navegacion mobile">
            <NavLink to={`/${RoutersLinks.Home}`} className={"navLink"} >Inicio</NavLink>
            <NavLink to={`/${RoutersLinks.Home}/${RoutersLinks.Menu}`} className={"navLink"} >Capacítate</NavLink>
            <a href={`${RoutersLinks.Descubre}`} className={"navLink"} >Descubre más</a>
         </div>
      </nav>
   );
};

export default NavBar;