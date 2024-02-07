import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';

import '../css/Perfil.css';

const Perfil = () => {

   const [show, setShow] = useState(false);
   const { logout } = useAuthContext();

   const usuario = localStorage.getItem('correo'); 

   const cerrarSesion = () => {
      logout()
   }

   return (
      <div className='Perfil'>
         <div className='imgPerfil' onClick={() => setShow(!show)}>
            <h2>{usuario[0].toUpperCase()}</h2>
         </div>

         <div className={show ? "Overlay" : "noShow"} onClick={() => setShow(false)}></div>

         <div className={show ? "contenidoPerfil" : "noShow"}>
            {usuario}
            <hr />
            <button className='primary' onClick={() => cerrarSesion()}>Cerrar sesión</button>
         </div>
      </div>
   );
};

export default Perfil;