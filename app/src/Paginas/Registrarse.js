import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { distribuidores, Regiones } from '../Constantes/ConstRegistros';
import { Imagenes } from '../Constantes/Imagenes';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import Loading from '../Componentes/Loading';
import '../css/Registrarse.css';
import { useForm } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import { toast, Toaster } from 'react-hot-toast';

const initialForm = {
   correo: "",
   distribuidor: "/",
   celular: "",
   codigo: ""
}

const Registrarse = () => {

   const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
      defaultValues: initialForm
   });

   const [distribuidores, setDistribuidores] = useState([]);
   const [regiones, setRegiones] = useState([]);

   const [data, setData] = useState({
      zonas: [],
      pv: []
   });

   const { loading, api_handleSubmit } = useApi();

   const onSubmit = (data) => {

      const config = {
         method: 'post',
         url: "signup",
      }

      const information = {
         ...config,
         data
      }

      api_handleSubmit(information)
         .then((res) => {
            toast.success(res.data, {
               duration: 7000,
               position: 'top-center'
            })
            reset();
            toast.loading("Redireccionando...", {
               duration: 5000,
               position: 'top-center'
            })
            setTimeout(() => {
               navigate(RoutersLinks.Login);
            }, 3000)

         }).catch((err) => {
            toast.error(err.response.data, {
               duration: 7000,
               position: 'top-center'
            })
         })
   };

   const getData = (table, id) => {

      const config = {
         method: 'get',
         url: table,
         params: {
            id
         }
      }

      api_handleSubmit(config)
         .then((res) => {

            const response = res.data;

            setData({
               ...data,
               [table]: response
            })
         })
         .catch((err) => {
            toast.error(err.response.data, {
               duration: 7000,
               position: 'top-center'
            })
         })
   }

   const getData_distribuidores = () => {

      const config = {
         method: 'get',
         url: 'distribuidores'
      }

      api_handleSubmit(config)
         .then((res) => {
            setDistribuidores(res.data)

         })
         .catch((err) => {
            toast.error(err.response.data, {
               duration: 7000,
               position: 'top-center'
            })
         })
   }

   const getData_regiones = () => {

      const config = {
         method: 'get',
         url: 'regiones'
      }

      api_handleSubmit(config)
         .then((res) => {
            setRegiones(res.data)

         })
         .catch((err) => {
            toast.error(err.response.data, {
               duration: 7000,
               position: 'top-center'
            })
         })
   }

   const validateOption = (value) => {
      return value !== '/';
   }

   useEffect(() => {
      getData_distribuidores();
      getData_regiones();
   }, []);

   return (
      <div className='Registrarse'>
         <div className='seccionForm'>
            <div className="nav-imgLogo">
               <img src={Imagenes.Logo} alt="" />
            </div>
            <div className="formRegistrarse">
               <h1>Registrarse</h1>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='formCampos'>

                     <div className="selectsInputs">
                        <div className="contentInputs">
                           <p>Distribuidor que lo atiende <span>*</span></p>
                           <select
                              {...register("distribuidor", {
                                 required: { value: true, message: "Este campo es obligatorio." },
                                 validate: validateOption
                              })}
                              className='selectDistribuidor'
                              value={watch('data.distribuidor')}
                           >
                              <option disabled value='/'>Elige una opción</option>
                              {distribuidores.map((item, index) => (
                                 <option key={index + 1} value={item.id}>{item.distribuidores}</option>
                              ))}
                           </select>
                           <br />
                           {errors.distribuidor && <span className='message_error'>Debes seleccionar una opción</span>}
                        </div>

                        <div className="contentInputs">
                           <p>
                              <input
                                 {...register("occ")}
                                 type="checkbox"
                              // value="occ"
                              /> OCC</p>
                           {/* {errors.region && <span className='message_error'>{errors.region.message}</span>} */}
                        </div>

                        <div className="zonas_regiones">
                           <div className="contentInputs">
                              <p>Región <span>*</span></p>
                              <select
                                 className='selectDistribuidor'
                                 defaultValue='/'
                                 onChange={({ target: { value } }) => getData('zonas', value)}
                              >
                                 <option disabled value="/">Elige una opción</option>
                                 {regiones.map((item, index) => (
                                    <option key={index + 1} value={item.id}>{item.regiones}</option>
                                 ))}
                              </select> <br />
                           </div>

                           <div className="contentInputs">
                              <p>Zonas Equipo ACF <span>*</span></p>
                              <select
                                 className='selectDistribuidor'
                                 defaultValue='/'
                                 disabled={data.zonas.length === 0 ? true : false}
                                 onChange={({ target: { value } }) => getData('pv', value)}
                              >
                                 <option disabled value="/">Elige una opción</option>
                                 {data.zonas.map((item, index) => (
                                    <option key={index} value={item.id}>{item.zonas}</option>
                                 ))}
                              </select> <br />
                           </div>

                           <div className="contentInputs">
                              <p>Puntos de venta<span>*</span></p>
                              <select
                                 {...register("pv", {
                                    required: { value: true, message: "Este campo es obligatorio." },
                                    validate: validateOption
                                 })}
                                 className='selectDistribuidor'
                                 defaultValue='/'
                                 disabled={data.pv.length === 0 ? true : false}
                              >
                                 <option disabled value="/">Elige una opción</option>
                                 {data.pv.map((item, index) => (
                                    <option key={index} value={item.id}>{item.pv}</option>
                                 ))}
                              </select> <br />
                              {errors.pv && <span className='message_error'>Debes seleccionar una opción en zonas</span>}
                           </div>
                        </div>

                        <div className="contentInputs">
                           <p>Código IPV ACF <span>(opcional)</span></p>
                           <input
                              {...register("codigo", {
                                 maxLength: {
                                    value: 7,
                                    message: "El Código IPV ACF no puede superar los 7 dígitos"
                                 },
                                 minLength: {
                                    value: 6,
                                    message: "El Código IPV ACF debe tener como mínimo 6 dígitos"
                                 }
                              })}
                              type="number" className='inputCorreo' placeholder='Código IPV ACF' /><br />
                           {errors.codigo && <span className='message_error'>{errors.codigo.message}</span>}
                        </div>
                     </div>

                     <div className="contentInputs">
                        <p>Correo Electrónico <span>*</span></p>
                        <input
                           {...register("correo", {
                              required: { value: true, message: "Este campo es obligatorio." },
                              pattern: { value: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, message: "Debe ser una dirección de correo electrónico válida." },
                              maxLength: { value: 70, message: "El correo electrónico no debe superar los 70 caracteres" }
                           })}
                           type="text" className='inputCorreo' placeholder='Correo Electrónico' /><br />
                        {errors.correo && <span className='message_error'>{errors.correo.message}</span>}
                     </div>

                     <div className="contentInputs">
                        <p>Celular <span>*</span></p>
                        <input
                           {...register("celular", {
                              required: { value: true, message: "Este campo es obligatorio." },
                              pattern: {
                                 value: /^[3][0-9]{2}-?[0-9]{7}$/,
                                 message: 'El número de celular debe ser un número registrado en Colombia'
                              },
                              maxLength: { value: 11, message: "El número de celular no debe superar los 11 dígitos" }

                           })}
                           type="number" className='inputCorreo' placeholder='Celular' /><br />
                        {errors.celular && <span className='message_error'>{errors.celular.message}</span>}
                     </div>

                  </div>
                  <button type="submit" className='buttonSubmit'>Registrarse</button>

                  <div className="seccionLoginRegistro">
                     <p>Ya estoy registrado</p>
                     <Link className='linkSeccion' to={RoutersLinks.Login}>Iniciar Sesion</Link>
                  </div>
               </form>

               {loading === true && <Loading />}
               <Toaster />

            </div>
         </div>
         <div className="imgPortada">
            <div className="navRegistrarse"></div>
            <img src={Imagenes.imgPortada} alt="" />
         </div>
      </div>
   );
};

export default Registrarse;