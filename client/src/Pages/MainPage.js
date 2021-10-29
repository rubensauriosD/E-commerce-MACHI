import "../Styles/MainPage.css";
import Categorias from "../Components/Categorias/Categorias";
import Courses from "../Components/Courses";
import Carrusel from "../Components/Carrusel/Carrusel"
import { categoria } from "../Elements/ArrayCategoria";
import { useSelector } from "react-redux";


export default function MainPage() {
  
  const productos=useSelector(state=>state.Products)
     
  

  return (
    <div>
    
      <h1>MACHI</h1>
      <div className="carruselDiv">
        <Carrusel />
      </div>
      <div className="categoryDiv">
         <Categorias categoria={categoria} />
      </div>

      <div className="coursesDiv">
        <h1>COMPONENTE DE "CAPACITACION Y CURSOS" Y "COMPOSTAJE COLABORATIVO</h1>
        <Courses/>
      </div>

      <h1>-------------------------------------</h1>
      
      <div className="helpDiv">
        <h1>COMPONENTE "ESTAMOS PARA AYUDARTE"</h1>
      </div>
      
      <h1>-------------------------------------</h1>

      <div className="imgaleryDiv">
        <h1>COMPONENTE "IMAGEN CON FRASE"</h1>
      </div>
      
      <h1>-------------------------------------</h1>

      <div className="reviewsDiv">
        <h1>COMPONENTE "RESEÑAS DESTACADAS?"</h1>
      </div>

      <h1>-------------------------------------</h1>
      
      <div className="statisticsDiv">
        <h1>COMPONENTE "ESTADISTICAS"</h1>
      </div>
      
      <h1>-------------------------------------</h1>

      <div className="phogaleryDiv">
        <h1>COMPONENTE "GALERIA DE FOTOS"</h1>
      </div>

      <h1>-------------------------------------</h1>

      <div className="contactDiv">
        <h1>COMPONENTE "FORMULARIO DE TRABAJO Y CONTACTO"</h1>
      </div>
    </div>
  );
}


