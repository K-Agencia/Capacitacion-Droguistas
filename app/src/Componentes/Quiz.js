import React, { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { AiOutlineMenu } from 'react-icons/ai';
import { PreguntasQuiz } from '../Constantes/PreguntasQuiz';
import { RoutersLinks } from '../Constantes/RoutersLinks';
import '../css/Quiz.css';
import { useForm } from '../hooks/useForm';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Quiz = ({ nombreQuiz, handleCapacitacion, idVideoC }) => {

   const [numPregunta, setNumPregunta] = useState(0);
   const [score, setScore] = useState(0);
   const [next, setNext] = useState(false);

   const {
      handleShowCapacitacion
   } = useForm();

   let pregunta = PreguntasQuiz[nombreQuiz][numPregunta];
   let countPreguntas = Object.keys(PreguntasQuiz[nombreQuiz]).length;

   const [classButton, setClassButton] = useState([]);

   const mostrarRespuestas = (position, positionAPI) => {

      let nunRespuestas = pregunta.opciones.length;
      let newArray = [];

      for (let i = 0; i < nunRespuestas; i++) {
         if (position === i) {
            if (pregunta.opciones[i].respuesta === true) {
               newArray[i] = "correcto";
               changeLocalStorage(positionAPI);
               setScore(score + 1);
            } else {
               newArray[i] = "incorrectoSeleccionada";
               changeLocalStorage(positionAPI);
            }
         } else {
            if (pregunta.opciones[i].respuesta === true) {
               newArray[i] = "correcto";
            } else {
               newArray[i] = "incorrectoSinSeleccionar";
            }
         }
      }

      console.log(newArray);

      setClassButton(newArray);
      setNext(true);
   }

   const getProducto = (idVideo) => {
      let producto;

      if (idVideo === 0) {
         producto = "SensitiveProAlivio";
      }
      else if (idVideo === 1) {
         producto = "Periogard";
      }
      else if (idVideo === 2) {
         producto = "Orthogard";
      }
      else if (idVideo === 3) {
         producto = "Total12";
      }
      else if (idVideo === 4) {
         producto = "LuminousWhite";
      }

      console.log(producto, idVideo);
      return producto;
   }

   const changeLocalStorage = (idApi) => {

      let textApiVideo = getProducto(parseInt(idVideoC));
      let nombreVariableLocal = `Pregunta${numPregunta + 1}_${textApiVideo}`;
      let apiVideo = JSON.parse(window.localStorage.getItem('data'));

      console.log(apiVideo[nombreVariableLocal]);

      if (apiVideo[nombreVariableLocal] === '-') {
         // console.log("apiVideo[nombreVariableLocal]");
         let idUduario = cookies.get("idUsuario");

         let datosCapacitacion = {
            url: "Quiz",
            idUsuario: idUduario,
            idOpcionRespuesta: idApi
         }

         handleShowCapacitacion(datosCapacitacion);

         apiVideo[nombreVariableLocal] = "SI";
         window.localStorage.setItem('data', JSON.stringify(apiVideo));
      }
   }

   const siguientePregunta = (valor) => {

      if (numPregunta < countPreguntas) {
         setNumPregunta(numPregunta + 1);
         setClassButton([]);
         setNext(false);
      }
      console.log(numPregunta, countPreguntas, numPregunta < countPreguntas);
   }

   const changeVideo = () => {
      handleCapacitacion();
   }

   useEffect(() => {
      window.scroll(0, 0);
   }, []);

   return (
      <>
         <div className={"Overlay opaco"} ></div>

         <div className='Quiz'>
            <h1>Cuestionario</h1>

            {numPregunta < countPreguntas ?
               <>
                  <h3>Pregunta #{numPregunta + 1}</h3>
                  <p>{pregunta.pregunta}</p>

                  <div className="divOpciones">
                     {pregunta.opciones.map((opt, index) => (
                        <div key={index} className="opcionesRespuestas">
                           <button className={`opciones ${classButton[index] && classButton[index]}`} onClick={() => !next && mostrarRespuestas(index, opt.idApiDB)}>
                              {opt.texto}
                           </button>
                        </div>
                     ))}
                  </div>

                  <hr />

                  <button className={`siguientePregunta ${!next && 'disable'}`} onClick={() => next && siguientePregunta()}> {/* disable */}
                     Siguiente <HiChevronDoubleRight />
                  </button>
               </>
               :
               <div className='resultadoFinal'>
                  <h1 className="texto">Tu Resultado</h1>
                  <h3 className="respuestasCorrectas">{`${score}/${countPreguntas}`}</h3>
                  <p></p>
                  <div className="footer2">
                     <hr />
                     <div className="botonesFooter">
                        <button className={`siguientePregunta`} onClick={() => window.location.pathname = RoutersLinks.Menu}>
                           Volver al menú <AiOutlineMenu />
                        </button>
                        <button className={`siguientePregunta`} onClick={() => changeVideo()}>
                           Continuar <HiChevronDoubleRight />
                        </button>
                     </div>
                  </div>
               </div>
            }
         </div>
      </>
   );
};

export default Quiz;

/*

correcto
{items.opciones.length === 2 ?
                  <div className="opcionesRespuestas">
                     <button className='opciones correcto'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                  </div>
                  :
                  <div className="opcionesRespuestas">
                     <button className='opciones correcto'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSeleccionada'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                     <button className='opciones incorrectoSinSeleccionar'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     </button>
                  </div>}
*/