import axios from "axios";
import { useState } from "react";
import { urlApi } from "../Constantes/RoutersLinks";

export const useApi = () => {

   const [loading, setLoading] = useState(false);

   const ConexionApi = axios.create({
      baseURL: urlApi,
      headers: {
         authorization: `Bearer ${localStorage.getItem('token')}`
      }
   })

   const api_handleSubmit = async (form) => {

      const auth = get_Auth(form);

      setLoading(true);

      const datos = await new Promise((resolve, reject) => {
         ConexionApi({
            method: form.method,
            url: form.url,
            params: form.params,
            data: form.data,
            auth: auth
         })
            .then((response) => {
               resolve(response);
            })
            .catch((error) => {
               reject(error)
            })
            .finally(() => {
               setLoading(false);
            })
      });

      return (datos);
   };

   const get_Auth = (form) => {

      if (form.auth) {
         return {
            username: form.auth.correo,
            password: form.auth.password
         }
      } else { return null }
   }

   return {
      loading,
      api_handleSubmit
   }
}