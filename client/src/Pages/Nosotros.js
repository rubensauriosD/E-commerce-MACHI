import "../Styles/Nosotros.css";
import * as React from "react";


export default function Nosotros() {
    return (
        <div>
            <div className="container">
                <h1>Quiénes somos?</h1>
                <div className="data" >
                    <p className="parrafo">
                    Concientizamos y brindamos herramientas para la gestión de residuos orgánicos en el hogar y empresas. A partir de la producción de Composteras para el reciclaje domiciliario y el programa de compostaje colaborativo para grandes generadores de residuos orgánicos.
                    </p>
                    <p className="parrafo">
                    Tambien fomentamos una alimentación 100% natural con el cultivo agroecológico, donde ofrecemos un servicio completo de instalación de huertas urbanas en los hogares, cajones de cultivo, Plantines, Tierra abonada, Humus de lombriz, Compost y pesticidas orgánicos.

                    </p>
                    <iframe className="video" src="https://drive.google.com/file/d/1Ke2dUE25oVJUvzhvQlSuPkW1a8J1nJ_-/preview" ></iframe>
                </div>
            </div>
        </div>
    );
}