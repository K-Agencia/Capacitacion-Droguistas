import React, { useEffect, useState } from 'react';
import { RxDoubleArrowRight, RxDoubleArrowLeft, RxHamburgerMenu } from 'react-icons/rx';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import { useApi } from '../hooks/useApi';
import Loading from '../Componentes/Loading';
import { toast, Toaster } from 'react-hot-toast';

import '../css/Capacitacion.css';

const Capacitacion = () => {

   const { loading, api_handleSubmit } = useApi();
   const [capacitacion, setCapacitacion] = useState({});

   const { id } = useParams();
   const video = parseInt(id);
   const cantProductos = JSON.parse(localStorage.getItem('videos')).length;

   const postVistoVideo = () => {

      const form = {
         method: 'post',
         url: 'viewVideo',
         params: { id: video }
      }

      api_handleSubmit(form)
         .then((res) => {
            toast.success(res.data, {
               duration: 10000,
               position: 'top-center'
            })
         })
         .catch((err) => {
            toast.error(err.data, {
               duration: 7000,
               position: 'top-center'
            })
         });
   }

   const endVideo = () => {
      const apiVideo = JSON.parse(localStorage.getItem('videos'));

      const id = apiVideo.findIndex(e => e.id === video);

      if (apiVideo[id].visto !== true) {
         postVistoVideo();
         apiVideo[id].visto = true;
         localStorage.setItem('videos', JSON.stringify(apiVideo));
      }
   }

   const get_video = () => {
      const form = {
         method: 'get',
         url: 'producto',
         params: { id: video }
      }

      api_handleSubmit(form)
         .then((res) => {
            setCapacitacion(res.data);
         })
         .catch((err) => {
            toast.error(err.data, {
               duration: 7000,
               position: 'top-center'
            })
         });
   }

   useEffect(() => {
      get_video();
   }, []);

   return (
      <div className='Capacitacion'>

         <div className="video">
            <div className="Content">
               <h1 className='tituloVideo'>{capacitacion.nombre}</h1>
               <div className="video-responsive">
                  <ReactPlayer
                     url={capacitacion.video}
                     config={{
                        vimeo: {
                           controls: true,
                           playsinline: false,
                           quality: 'auto'
                        }
                     }}
                     volumen={1}
                     controls
                     onEnded={() => endVideo()}
                  />
               </div>
            </div>

         </div>

         <div className='container-btn Content'>

            <a className='link-btn' href={`/${RoutersLinks.Home}/${RoutersLinks.Menu}/${video - 1 === 0 ? "" : video - 1}`}>
               <button className={`navigation ${video - 1 === 0 ? "disable" : "btn"}`}><RxDoubleArrowLeft /> ANTES </button>
            </a>

            <a className='link-btn' href={`/${RoutersLinks.Home}/${RoutersLinks.Menu}`}>
               <button className="navigation btn"><RxHamburgerMenu /> TODAS LAS LECCIONES</button>
            </a>

            <a className='link-btn' href={`${video === cantProductos ? "" : video + 1}`}>
               <button className={`navigation ${video === cantProductos ? "disable" : "btn"}`}>DESPUES <RxDoubleArrowRight /></button>
            </a>
            {/* {video !== cantProductos &&
            } */}

         </div>

         <div className="informacion Content">
            <div className=''>
               <h3 className='titulo'>Descripción</h3>
               <div className="descripcion">
                  <div className='texto'>
                     <p>
                        {capacitacion.texto}
                        <br />
                     </p>
                  </div>
               </div>
            </div>

         </div>

         {loading === true && <Loading />}
         <Toaster />

      </div>
   );
};

export default Capacitacion;