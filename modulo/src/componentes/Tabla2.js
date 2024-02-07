import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import axios from 'axios';
import { preguntas } from '../constantes/preguntas';
import '../css/Tabla2.css';
import { DeleteForever, Edit } from '@mui/icons-material';
import { RutaAPI } from '../constantes/RutaAPI';
import FormModal from './FormModal';
import Swal from 'sweetalert2';


const muiCache = createCache({
   key: 'mui-datatables',
   prepend: true,
});

const columns = [
   {
      name: 'numeroId',
      label: 'N°',
      options: {
         filter: false,
         searchable: false
      },
   },
   {
      name: 'correoUsuarios',
      label: 'Correo Electrónico',
      options: {
         filter: false,
      },
   },
   {
      name: 'distribuidorUsuarios',
      label: 'Distribuidor',
      options: {
         filter: true,
      },
   },
   {
      name: 'regionUsuarios',
      label: 'Región Zonal',
      options: {
         filter: true,
      },
   },
   {
      name: 'codigoDrogueria',
      label: 'Código IPV ACF',
      options: {
         filter: false,
      },
   },
   {
      name: 'celularUsuarios',
      label: 'Celular',
      options: {
         filter: false,
         sort: false,
         searchable: false
      },
   },
   {
      name: 'fechaRegistro',
      label: 'Fecha Registro',
      options: {
         filter: false,
         sort: false,
         searchable: false,

      },
   }
];

const theme = createTheme({
   overrides: {
      MUIDataTableSelectCell: {
         expandDisabled: {
            // Soft hide the button.
            visibility: 'hidden',
         },
      },
   },
});

const Tabla2 = () => {

   const [datos, setDatos] = useState([]);
   const [open, setOpen] = useState(false);
   // const [infoModal, setInfoModal] = useState([]);

   const handleOpen = (informacion) => {

      localStorage.setItem('idUsuarios', informacion.idUsuarios);
      localStorage.setItem('correoUsuarios', informacion.correoUsuarios);
      localStorage.setItem('distribuidorUsuarios', informacion.distribuidorUsuarios);
      localStorage.setItem('regionUsuarios', informacion.regionUsuarios);
      localStorage.setItem('celularUsuarios', informacion.celularUsuarios);
      console.log(informacion)
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      localStorage.removeItem('idUsuarios');
      localStorage.removeItem('correoUsuarios');
      localStorage.removeItem('distribuidorUsuarios');
      localStorage.removeItem('regionUsuarios');
      localStorage.removeItem('celularUsuarios');

      // localStorage.setItem('data', JSON.stringify(dataApi));
      setDatos(JSON.parse(window.localStorage.getItem('data')));
   };

   const options = {
      filter: true,
      filterType: 'checkbox',
      responsive: 'standard',
      download: false,
      print: false,
      searchPlaceholder: "Buscar por Correo Electrónico, Distribuidor, Región Zonal ó Código IPV ACF",
      expandableRows: true,
      expandableRowsHeader: false,
      expandableRowsOnClick: true,
      renderExpandableRow: (rowData, rowMeta) => {

         let info = datos[rowMeta.dataIndex];

         return (
            <TableRow>
               <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                  <Collapse in={true} timeout="auto" unmountOnExit>
                     <Box>
                        <Button sx={{ margin: 3 }} variant="contained" startIcon={<Edit />} onClick={() => handleOpen(info)}>Modificar Registro</Button>
                        <Button sx={{ margin: 3 }} variant="contained" color="error" startIcon={<DeleteForever />} onClick={() => alertaEliminar(info.idUsuarios, info.correoUsuarios)}>Eliminar Registro</Button>
                     </Box>
                     <Box sx={{ margin: 3 }}>
                        <Typography variant="h6" gutterBottom component="div">
                           Visualización de los videos
                        </Typography>
                        <hr />
                        <Box sx={{ margin: 3 }}>
                           <Table size="small" aria-label="purchases">
                              <TableHead>
                                 <TableRow>
                                    <TableCell align="center"><b>Sensitive Pro-Alivio</b></TableCell>
                                    <TableCell align="center"><b>PerioGard</b></TableCell>
                                    <TableCell align="center"><b>OrthoGard</b></TableCell>
                                    <TableCell align="center"><b>Total 12</b></TableCell>
                                    <TableCell align="center"><b>Luminous White</b></TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 <TableRow>
                                    <TableCell align="center">{info.SensitiveProAlivio}</TableCell>
                                    <TableCell align="center">{info.Periogard}</TableCell>
                                    <TableCell align="center">{info.Orthogard}</TableCell>
                                    <TableCell align="center">{info.Total12}</TableCell>
                                    <TableCell align="center">{info.LuminousWhite}</TableCell>
                                 </TableRow>

                              </TableBody>
                           </Table>
                        </Box>
                     </Box>
                     <Box sx={{ margin: 3 }}>
                        <Typography variant="h6" gutterBottom component="div">
                           Quiz
                        </Typography>
                        <hr />

                        {preguntas.map((obj, index) => (
                           <Box sx={{ margin: 3 }} key={index}>
                              <Typography variant="h6" gutterBottom component="div">
                                 {obj.titulo}
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                 <TableHead>
                                    <TableRow>
                                       <TableCell width={'50%'}><b>Pregunta</b></TableCell>
                                       <TableCell width={'20%'}><b>Respuesta</b></TableCell>
                                       <TableCell width={'10%'}></TableCell>
                                       <TableCell width={'20%'}><b>Fecha</b></TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>

                                    {obj.quiz.map((item, index) => {

                                       let itemClave = item.clave.split('_');
                                       let tipoRespuesta = info[`${itemClave[0]}Tipo_${itemClave[1]}`];

                                       return (
                                          <TableRow key={index}>
                                             <TableCell>{item.pregunta}</TableCell>
                                             <TableCell>{info[item.clave]}</TableCell>
                                             <TableCell className={tipoRespuesta === 'true' ? "esCorrecto" : tipoRespuesta === 'false' ? "esIncorrecto" : ""}>
                                                {tipoRespuesta === 'true' ? "CORRECTO" : tipoRespuesta === 'false' ? "INCORRECTO" : "-"}
                                             </TableCell>
                                             <TableCell>{info[`${itemClave[0]}Fecha_${itemClave[1]}`]}</TableCell>
                                          </TableRow>
                                       )
                                    })}

                                 </TableBody>
                              </Table>
                           </Box>
                        ))}


                     </Box>
                  </Collapse>
               </TableCell>

               {open === true && <FormModal handleClose={handleClose} />}
            </TableRow>
         );
      },
      selectableRows: "none",
      rowsPerPageOptions: [10, 50, 100, 1000],
      textLabels:
      {
         body: {
            noMatch: "Descargando información ...",
            toolTip: "Sort",
            columnHeaderTooltip: column => `Sort for ${column.label}`
         },
         pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
         },
      }
   };

   const formatoFecha = (data) => {

      const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

      let dataApi = data;
      let cant = Object.keys(dataApi).length;
      console.log(cant);

      for (let i = 0; i < cant; i++) {

         for (const property in dataApi[i]) {
            let clave = property.toLocaleLowerCase();
            dataApi[i]["numeroId"] = i + 1;

            if (clave.indexOf('fecha') >= 0 && dataApi[i][property] !== '-') {
               // console.log(clave);
               let date = new Date(dataApi[i][property]);
               let result = date.getDate() + "-" + (months[date.getMonth()]) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
               dataApi[i][property] = result;
            }
         }
      }
      localStorage.setItem('data', JSON.stringify(dataApi));
      setDatos(dataApi);
   }

   const getData = () => {
      axios({
         method: 'get',
         url: `${RutaAPI}/getAllRegistros`
      })
         .then(function (response) {
            formatoFecha(response.data);
         });
   }

   const alertaEliminar = (idUser, correo) => {
      Swal.fire({
         title: `Desea eliminar el usuario ${correo}`,
         showDenyButton: true,
         // showCancelButton: true,
         confirmButtonText: 'Eliminar',
      }).then((result) => {
         /* Read more about isConfirmed, isDenied below eliminarRegistro */
         if (result.isConfirmed) {
            eliminarRegistro(idUser);
         }
      })
   }

   const eliminarRegistro = (idUsuarios) => {
      axios.delete(`${RutaAPI}/delete/${idUsuarios}`)
         .then((res) => {
            if (res.data === true) {
               Swal.fire('Eliminado', 'El registro ha sido eliminado correctamente', 'success');
               eliminarLocalStorange(idUsuarios);
            } else {
               Swal.fire('Error', 'El registro no se ha podido eliminar correctamente, vuelve a intentarlo', 'error');
            }
         });

      const eliminarLocalStorange = (idUserDelete) => {
         let apiData = JSON.parse(window.localStorage.getItem('data'));
         let newData = apiData.filter((item) => item.idUsuarios !== idUserDelete);
         // console.log(newData);
         localStorage.removeItem('data');
         window.localStorage.setItem('data', JSON.stringify(newData));
         setDatos(JSON.parse(window.localStorage.getItem('data')));
      }
   }

   useEffect(() => {
      getData();
   }, []);

   return (
      <CacheProvider value={muiCache}>
         <ThemeProvider theme={theme}>
            <MUIDataTable
               title={"Reporte General - Capacitación a Droguistas"}
               elevation={1}
               data={datos}
               columns={columns}
               options={options}

            />
         </ThemeProvider>
      </CacheProvider>
   );

}

export default Tabla2;