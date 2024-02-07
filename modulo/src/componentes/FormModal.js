import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { drogerias } from '../constantes/ConstRegistros';
import { RutaAPI } from '../constantes/RutaAPI';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const cookies = new Cookies();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const FormModal = ({ handleClose }) => {

  const [form, setForm] = useState({
    idUsuarios: localStorage.getItem('idUsuarios'),
    correoUsuarios: localStorage.getItem('correoUsuarios'),
    distribuidorUsuarios: localStorage.getItem('distribuidorUsuarios'),
    regionUsuarios: localStorage.getItem('regionUsuarios'),
    celularUsuarios: localStorage.getItem('celularUsuarios')
  });

  const [error, setError] = useState({ estado: false });
  const [loading, setLoading] = useState(false);
  const [responseApi, setResponseApi] = useState(null);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value
    });
  }

  const handleBlur = () => {
    let errors = {}

    if (!form["correoUsuarios"].trim()) {
      errors["correoUsuarios"] = true;
    }

    if (!form["celularUsuarios"].trim()) {
      errors["celularUsuarios"] = true;
    }

    errors.estado = true;
    setError(errors);
  };

  const changeLocalStorage = () => {

    let datosApi = JSON.parse(window.localStorage.getItem('data'));

    for (let i = 0; i < datosApi.length; i++) {

      let id_usuarioCookie = parseInt(localStorage.getItem('idUsuarios'));
      let id_usuarioApi = parseInt(datosApi[i]["idUsuarios"]);
      console.log(id_usuarioApi);
      if (id_usuarioApi === id_usuarioCookie) {

        datosApi[i]["correoUsuarios"] = form.correoUsuarios;
        datosApi[i]["distribuidorUsuarios"] = form.distribuidorUsuarios;
        datosApi[i]["regionUsuarios"] = form.regionUsuarios;
        datosApi[i]["celularUsuarios"] = form.celularUsuarios;
        window.localStorage.setItem('data', JSON.stringify(datosApi));
        handleClose();
        break;
      };
    };
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    // console.log(form.celularUsuarios);
    handleBlur(e);

    if (Object.keys(error).length === 1) {

      setLoading(true);
      axios.post(`${RutaAPI}/changeData`, form)
        .then(function (response) {
          console.log(response)
          changeLocalStorage();
          setResponseApi(true);
          Swal.fire('Modificado', 'El registro ha sido modificado correctamente', 'success');
        })
        .catch(function (error) {
          setResponseApi(false);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Hay un elemento de la validacion que tiene un estado 'true'");
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div className='Modal'>
      <Modal
        open={true}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ ...style, width: '30%' }}>

            <Typography variant="h6" gutterBottom component="div">
              Editar Datos
            </Typography>

            <p></p>

            <TextField
              className="marginInput"
              required fullWidth
              label="Correo Electrónico" name={'correoUsuarios'}
              defaultValue={form.correoUsuarios ? form.correoUsuarios : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.correo ? true : false}
              helperText={error.correo ? "Debes llenar este campo" : ""}
            />

            <FormControl required fullWidth className="marginInput">
              <InputLabel id="demo-simple-select-label">Distribuidor que lo atiende</InputLabel>
              <Select
                defaultValue={form.distribuidorUsuarios ? form.distribuidorUsuarios : "/"}
                label="Distribuidor que lo atiende"
                name={'distribuidorUsuarios'}
                onChange={handleChange}
                my={5}
              >
                <MenuItem disabled value="/">Elige una opción</MenuItem>
                {drogerias.map((item, index) => (
                  <MenuItem key={index} value={item.distr}>{item.distr}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />

            <FormControl required fullWidth cl
              assName="marginInput">
              <InputLabel id="demo-simple-select-label">Zonas Equipo ACF</InputLabel>
              <Select
                defaultValue={form.regionUsuarios ? form.regionUsuarios : "OCC"}
                label="Zonas Equipo ACF"
                name={'regionUsuarios'}
                onChange={handleChange}
              >
                <MenuItem value={"OCC"}>OCC</MenuItem>

                <MenuItem disabled value="">ANTIOQUIA</MenuItem>
                <MenuItem value={"ZONA ANTIOQUIA PERIFERIA RIONEGRO"}>ZONA ANTIOQUIA PERIFERIA RIONEGRO</MenuItem>
                <MenuItem value={"ZONA ANTIOQUIA OCCIDENTE"}>ZONA ANTIOQUIA OCCIDENTE</MenuItem>
                <MenuItem value={"ZONA ANTIOQUIA SUR"}>ZONA ANTIOQUIA SUR</MenuItem>
                <MenuItem value={"ZONA ANTIOQUIA NORTE"}>ZONA ANTIOQUIA NORTE</MenuItem>
                <MenuItem value={"ZONA ANTIOQUIA NORORIENTE"}>ZONA ANTIOQUIA NORORIENTE</MenuItem>

                <MenuItem disabled value="">CENTRO</MenuItem>
                <MenuItem value={"ZONA CENTRO NORTE DEL VALLE"}>ZONA CENTRO NORTE DEL VALLE</MenuItem>
                <MenuItem value={"ZONA CENTRO CALDAS"}>ZONA CENTRO CALDAS</MenuItem>
                <MenuItem value={"ZONA CENTRO QUINDIO"}>ZONA CENTRO QUINDIO</MenuItem>
                <MenuItem value={"ZONA CENTRO DOS QUEBRADAS"}>ZONA CENTRO DOS QUEBRADAS</MenuItem>
                <MenuItem value={"ZONA CENTRO NEIVA"}>ZONA CENTRO NEIVA</MenuItem>

                <MenuItem disabled value="">ATLANTICO</MenuItem>
                <MenuItem value={"ZONA ATLANTICO SANTA MARTA"}>ZONA ATLANTICO SANTA MARTA</MenuItem>
                <MenuItem value={"ZONA ATLANTICO CARTAGENA"}>ZONA ATLANTICO CARTAGENA</MenuItem>
                <MenuItem value={"ZONA ATLANTICO SINCELEJO"}>ZONA ATLANTICO SINCELEJO</MenuItem>
                <MenuItem value={"ZONA ATLANTICO SUCRE SINCELEJO"}>ZONA ATLANTICO SUCRE SINCELEJO</MenuItem>

                <MenuItem disabled value="">ATLANTICO</MenuItem>
                <MenuItem value={"ZONA ATLANTICO BARRANQUILLA"}>ZONA ATLANTICO BARRANQUILLA</MenuItem>
                <MenuItem value={"ZONA ATLANTICO SOLEDAD"}>ZONA ATLANTICO SOLEDAD</MenuItem>
                <MenuItem value={"ZONA ATLANTICO POBLACIONES"}>ZONA ATLANTICO POBLACIONES</MenuItem>
                <MenuItem value={"ZONA ATLANTICO VALLEDUPAR"}>ZONA ATLANTICO VALLEDUPAR</MenuItem>

                <MenuItem disabled value="">CUNDINAMARCA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA BOSA"}>ZONA CUNDINAMARCA BOSA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA PATIO BONITO"}>ZONA CUNDINAMARCA PATIO BONITO</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA PERDOMO"}>ZONA CUNDINAMARCA PERDOMO</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA PERIFERIA MOSQUERA"}>ZONA CUNDINAMARCA PERIFERIA MOSQUERA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA SOACHA"}>ZONA CUNDINAMARCA SOACHA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA VENECIA"}>ZONA CUNDINAMARCA VENECIA</MenuItem>

                <MenuItem disabled value="">CUNDINAMARCA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA 20 DE JULIO"}>ZONA CUNDINAMARCA 20 DE JULIO</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA CHAPINERO"}>ZONA CUNDINAMARCA CHAPINERO</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA ENGATIVA"}>ZONA CUNDINAMARCA ENGATIVA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA ESTRADA"}>ZONA CUNDINAMARCA ESTRADA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA FONTIBON"}>ZONA CUNDINAMARCA FONTIBON</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA USME"}>ZONA CUNDINAMARCA USME</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA MIXTA"}>ZONA CUNDINAMARCA MIXTA</MenuItem>

                <MenuItem disabled value="">CUNDINAMARCA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA SUBA GAITANA"}>ZONA CUNDINAMARCA SUBA GAITANA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA CENTRO GALAN"}>ZONA CUNDINAMARCA CENTRO GALAN</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA PERIFERIA CHIA"}>ZONA CUNDINAMARCA PERIFERIA CHIA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA SAN CRISTOBAL"}>ZONA CUNDINAMARCA SAN CRISTOBAL</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA BOYACA"}>ZONA CUNDINAMARCA BOYACA</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA SUBA CENTRO"}>ZONA CUNDINAMARCA SUBA CENTRO</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA VERBENAL"}>ZONA CUNDINAMARCA VERBENAL</MenuItem>

                <MenuItem disabled value="">PACIFICO</MenuItem>
                <MenuItem value={"ZONA PACIFICO PERIFERIA POPAYAN"}>ZONA PACIFICO PERIFERIA POPAYAN</MenuItem>
                <MenuItem value={"ZONA PACIFICO NORTE CALI"}>ZONA PACIFICO NORTE CALI</MenuItem>
                <MenuItem value={"ZONA PACIFICO PERIFERIA TULUA"}>ZONA PACIFICO PERIFERIA TULUA</MenuItem>
                <MenuItem value={"ZONA PACIFICO DISTRITO CALI"}>ZONA PACIFICO DISTRITO CALI</MenuItem>
                <MenuItem value={"ZONA PACIFICO SUR CALI"}>ZONA PACIFICO SUR CALI</MenuItem>
                <MenuItem value={"ZONA PACIFICO PASTO"}>ZONA PACIFICO PASTO</MenuItem>

                <MenuItem disabled value="">ORIENTE</MenuItem>
                <MenuItem value={"ZONA CUNDINAMARCA META CASANARE"}>ZONA CUNDINAMARCA META CASANARE</MenuItem>

                <MenuItem disabled value="">ORIENTE</MenuItem>
                <MenuItem value={"ZONA ORIENTE CENTRO"}>ZONA ORIENTE CENTRO</MenuItem>
                <MenuItem value={"ZONA ORIENTE SUR"}>ZONA ORIENTE SUR</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className="marginInput2"
              required fullWidth
              label="Celular" name={'celularUsuarios'}
              defaultValue={form.celularUsuarios ? form.celularUsuarios : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.celular ? true : false}
              helperText={error.celular ? "Debes llenar este campo" : ""}
            />

            <Box>
              <Button disableElevation variant="contained" type='submit'>Guardar</Button>
              <Button disableElevation variant="outlined" onClick={() => handleClose()}>Cancelar</Button>
            </Box>

          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default FormModal;