import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { urlApi } from "../Constantes/RoutersLinks";

export const useForm = (initialForm, validationForm) => {

   const [form, setForm] = useState(initialForm);
   const [error, setError] = useState({ staus: false });
   const [showErrors, setShowErrors] = useState(false);
   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(null);
   const [data, setData] = useState();

   const handleChange = (e) => {

      const target = e.target;
      const name = target.name;
      const value = target.value;

      setForm({
         ...form,
         [name]: value
      });
      delete form[''];
   };

   const handleBlur = (e) => {
      handleChange(e);
      setError(validationForm(form));
      delete error[''];
   }

   const handleSubmit = (e) => {

      e.preventDefault();
      handleBlur(e);

      setShowErrors(true);
      delete form[''];
      delete error[''];
      // error.estado, 
      // console.log(Object.keys(error).length === 1, error.estado, Object.keys(error).length === 1 && error.estado)

      if (Object.keys(error).length === 1 && error.estado) {

         setLoading(true);
         axios.post(`${urlApi}/${form.accessAPI}`, form)
            .then(function (response) {
               // console.log(response)
               setData(response.data);
               setResponseApi(true);
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

   const handleShowCapacitacion = (datosCapacitacion) => {

      axios.post(`${urlApi}/${datosCapacitacion.url}`, datosCapacitacion)
         .then(function (response) {
            // console.log(response)
            setData(response.data);
            setResponseApi(true);
         })
         .catch(function (error) {
            setResponseApi(false);
            console.log(error);
         })
         .finally(() => {
            setLoading(false);
         });
   }

   const descargaMaterial = (nameFile, nameDownload) => {

      axios({
         method: 'get',
         url: `${urlApi}/materialDescargable/${nameFile}`,
         responseType: 'blob'
      })
         .then(function (res) {
            fileDownload(res.data, nameDownload)
         });
   }

   return {
      form,
      error,
      showErrors,
      loading,
      responseApi,
      data,
      handleChange,
      handleBlur,
      handleSubmit,
      handleShowCapacitacion,
      descargaMaterial
   }

}