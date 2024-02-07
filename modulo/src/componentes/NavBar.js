import React from 'react';
import '../css/NavBar.css';
import logoVisita from '../imagenes/LogoVisita.svg';

const NavBar = () => {


   return (
      <nav className='NavBar'>
         <div className="container">

            <div className="nav-imgLogo">
               <img src={logoVisita} alt="" />
            </div>

            <div className="nav-navegacion">
               <h1>Módulo Administrativo</h1>
            </div>
         </div>

      </nav>
   );
};

export default NavBar;