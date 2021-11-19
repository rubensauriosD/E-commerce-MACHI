import "../Styles/MainPage.css";
import Categorias from "../Components/Categorias/Categorias";
import Courses from "../Components/Courses/Courses";
import Carrusel from "../Components/Carrusel/Carrusel";
import CarruselGaleria from "../Components/Carrusel/CarruselGaleria";
import { categoria } from "../Elements/ArrayCategoria";


export default function MainPage() {
  

  return (
    <div>
    
      <div className="carruselDiv">
        <Carrusel />
      </div>
      <div className="categoryDiv">
         <Categorias categoria={categoria} />
      </div>

      <div className="coursesDiv">
         <Courses/>
      </div>

     {/* <h1>-------------------------------------</h1>

      <div className="reviewsDiv">
        <h1>COMPONENTE "RESEÑAS DESTACADAS?"</h1>
      </div>

      <h1>-------------------------------------</h1>
      
      <div className="statisticsDiv">
        <h1>COMPONENTE "ESTADISTICAS"</h1>
      </div>
       */}
      <div className="phogaleryDiv" >
        <CarruselGaleria />
      </div>

      {/* <h1>-------------------------------------</h1>

      <div className="contactDiv">
        <h1>COMPONENTE "FORMULARIO DE TRABAJO Y CONTACTO" (FOOTER)</h1>
      </div> */}

    </div>
  );
}


