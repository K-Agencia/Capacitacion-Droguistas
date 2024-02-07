import { productosCapacitacion } from "./Imagenes";
import LuminousWhite from "./Textos/LuminousWhite";
import Orthogard from "./Textos/Orthogard";
import Periogard from "./Textos/Periogard";
import Sensitive from "./Textos/Sensitive";
import Total12 from "./Textos/Total12";

export const Capacitaciones = [
   {
      titulo: "Colgate Sensitive Pro-Alivio",
      video: "https://vimeo.com/708423004",
      descripcionCorta: "Estimado Droguista, le damos la bienvenida a esta capacitación virtual sobre la Crema Sensitive Pro Alivio.  Esperamos que este material sea de su total agrado y utilidad en el acompañamiento a sus clientes. La sensibilidad dental es un dolor breve, agudo y punzante que se origina en la raíz expuesta del diente. Esta exposición deja al descubierto unos poros que a estímulos externos como frío, calor, dulce, ácido, etc, generan dolor.",
      descripcion: <Sensitive />,
      nombreQuiz: "sensitive"
   },
   {
      titulo: "Colgate PerioGard",
      video: "https://vimeo.com/708422887",
      descripcionCorta: `Estimado Droguista, le damos la bienvenida a esta capacitación virtual sobre la línea PERIOGARD Esperamos que este material sea de su total agrado y utilidad en el acompañamiento a sus clientes. Una de las condiciones más frecuentes de la cavidad oral es la inflamación de la encía o gingivitis, la cual es causada por la acumulación de placa bacteriana y restos de alimentos que no son removidos correctamente alrededor de los dientes, generando enrojecimiento, sangrado e inflamación de la encía.`,
      descripcion: <Periogard />,
      nombreQuiz: "periogard"
   },
   {
      titulo: "Colgate OrthoGard",
      video: "https://vimeo.com/708422775",
      descripcionCorta: `Estimado Droguista, le damos la bienvenida a esta capacitación virtual sobre la línea OrthoGard Esperamos que este material sea de su total agrado y utilidad en el acompañamiento a sus clientes.
      La ortodoncia o uso de brackets va en aumento en todas las edades y esto implica un riesgo de caries e inflamación de las encías, por la dificultad para realizar la higiene oral. Es por eso que en Colgate contamos con la línea especializada OrthoGard, desarrollada para brindar un mejor cuidado de dientes y encías en estos casos.`,
      descripcion: <Orthogard />,
      nombreQuiz: "ortogard"
   },
   {
      titulo: "Colgate Total 12 Gums",
      video: "https://vimeo.com/708423091",
      descripcionCorta: `Estimado Droguista, le damos la bienvenida a esta capacitación virtual sobre la Crema Colgate Total 12 Encías Reforzadas.  Esperamos que este material sea de su total agrado y utilidad en el acompañamiento a sus clientes.
      Nuestra boca está conformada por dientes y tejidos blandos, los dientes sólo constituyen el 20% de la boca, mientras que los tejidos blandos como la encía, las mejillas, la lengua, son el 80% restante.`,
      descripcion: <Total12 />,
      nombreQuiz: "total12"
   },
   {
      titulo: "Colgate Luminous White",
      video: "https://vimeo.com/708422646",
      descripcionCorta: `Estimado Droguista, le damos la bienvenida a esta capacitación virtual sobre la Crema Luminous White Esperamos que este material sea de su total agrado y utilidad en el acompañamiento a sus clientes. Los dientes juegan un papel muy importante en nuestra vida, no solamente nos ayudan en funciones como la masticación y la fonación, sino que son determinantes en la estética, aspecto que cada día adquiere más importancia en el relacionamiento de las personas y la calidad de vida.`,
      descripcion: <LuminousWhite />,
      nombreQuiz: "luminous"
   }
]

export const MenuCap = [
   {
      titulo: "Colgate Sensitive Pro-Alivio",
      tituloAPI: "SensitiveProAlivio",
      imagen: productosCapacitacion.sensitive,
      descarga: "ColgateSensitiveProAlivio.pdf",
      nombreDescarga: "Colgate Sensitive Pro-Alivio.pdf",
      visto: true
   },
   {
      titulo: "Colgate PerioGard",
      tituloAPI: "Periogard",
      imagen: productosCapacitacion.periogard,
      descarga: "ColgatePerioGard.pdf",
      nombreDescarga: "Colgate PerioGard.pdf",
      visto: false
   },
   {
      titulo: "Colgate OrthoGard",
      tituloAPI: "Orthogard",
      imagen: productosCapacitacion.ortogard,
      descarga: "ColgateOrthoGard.pdf",
      nombreDescarga: "Colgate OrthoGard.pdf",
      visto: false
   },
   {
      titulo: "Colgate Total 12 Gums",
      tituloAPI: "Total12",
      imagen: productosCapacitacion.total12,
      descarga: "ColgateTotal12EnciasReforzadas.pdf",
      nombreDescarga: "Colgate Total 12 Encías Reforzadas.pdf",
      visto: false
   },
   {
      titulo: "Colgate Luminous White",
      tituloAPI: "LuminousWhite",
      imagen: productosCapacitacion.luminous,
      descarga: "ColgateLuminousWhite.pdf",
      nombreDescarga: "Colgate Luminous White.pdf",
      visto: false
   },
]