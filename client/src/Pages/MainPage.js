import "../Styles/MainPage.css";
import Categorias from "../Components/Categorias/Categorias";
import Courses from "../Components/Courses/Courses";
import Carrusel from "../Components/Carrusel/Carrusel"
import { categoria } from "../Elements/ArrayCategoria";
import logo from "../../src/logo.png";


export default function MainPage() {
  

  return (
    <div>
      {/* <img src={logo} width="130px"/> */}
      <div className="carruselDiv">
        <Carrusel />
      </div>
      <div className="categoryDiv">
         <Categorias categoria={categoria} />
      </div>

      <div className="coursesDiv">
         <Courses/>
      </div>

     {/*  <h1>-------------------------------------</h1>
      
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
        <h1>COMPONENTE "FORMULARIO DE TRABAJO Y CONTACTO" (FOOTER)</h1>
      </div> */}

    </div>
  );
}


