import { Button } from '@mui/material';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { RutaAPI } from '../constantes/RutaAPI';
import { RiFileExcel2Fill } from 'react-icons/ri';
import Loading from './Loading';

const ButtonDownload = () => {

   const [cargando, setCargando] = useState(false);

   const getInforme = () => {

      setCargando(true)

      axios({
         method: 'get',
         url: `${RutaAPI}/downloadExcel`,
         responseType: 'blob'
      })
         .then(function (res) {

            const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
            let date = new Date();
            let result = date.getDate() + "_" + (months[date.getMonth()]) + "_" + date.getFullYear();
            fileDownload(res.data, `Reporte - Capacitación Droguistas - ${result}.xlsx`);
            setCargando(false)

         });

   }

   return (
      <div className='ButtonDownload'>
         <Button size="large" color="success" variant="contained" onClick={() => getInforme()} startIcon={<RiFileExcel2Fill />}>Descargar Informe General</Button>
         {
            cargando === true && <Loading />
         }
      </div>
   );
};

export default ButtonDownload;