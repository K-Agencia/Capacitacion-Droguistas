import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useApi } from '../hooks/useApi';
import Loading from '../Componentes/Loading';

import '../css/MenuCapacitacion.css';

const MenuCapacitacion = () => {

   const { loading, api_handleSubmit } = useApi();
   const [menuCap, setMenuCap] = useState([]);

   useEffect(() => {
      const vistoVideo = () => {
         const form = {
            method: 'get',
            url: 'productos',
         }
   
         api_handleSubmit(form)
            .then((res) => {
               localStorage.setItem('videos', JSON.stringify(res.data));
               setMenuCap(res.data);
               console.log(res.data);
            })
            .catch((err) => {
               console.log(err);
            });
      }
      
      vistoVideo();
   }, []);

   return (
      <div className='MenuCapacitacion'>
         <div className="Content">
            <h1 className='titulo'>Capacitaciones</h1>

            <div className="menuVideos">
               {menuCap.map((item, index) => (

                  <div key={index} className={`capVideos ${item.visto === true ? "visto" : "noVisto"}`}>

                     {item.visto === true ?
                        <div className="status Check">
                           <AiOutlineCheck />
                           <p>Revisado</p>
                        </div>
                        :
                        <div className="status Close">
                           <AiOutlineClose />
                           <p>Sin Revisar</p>
                        </div>
                     }

                     <div className="nameContent">
                        <div className="imgContent">
                           <img src={item.imagenes} alt="" />
                        </div>
                        <h3>{item.nombre}</h3>
                     </div>

                     <Link to={`${item.id}`} className='verCapacitacion'>Ver ahora</Link>

                     <div className="buttonsMobile">
                        <Link to={`${item.id}`} className='verCapacitacion mobile'>Ver ahora</Link>
                     </div>
                  </div>

               ))}
            </div>
         </div>
         {loading === true && <Loading />}
      </div>
   );
};

export default MenuCapacitacion;