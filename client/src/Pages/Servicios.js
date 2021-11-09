import "../Styles/Servicios.css";
import * as React from "react";


export default function Nosotros() {
    return (
        <div>
            <div className="container">
                <h1>Servicios</h1>
                <div className="data" >
                    <p className="parrafo">
                    Servicio de compostaje colaborativo. 
                    Realizamos una alianza con ECOLINK para la logística de orgánicos compostables. 
                    Conectamos a empresas e instituciones que quieran gestionar correctamente sus residuos 
                    orgánicos brindándoles asesoría y herramientas para la correcta disposición de los mismos.
                    </p>
                    
                    <iframe title="pdf de la empresa" className="pdf" src="https://docs.google.com/document/d/e/2PACX-1vRNhLuPoCvlfdaQjn-0L_v2Wwr71iyascPS10Itg_ha--u_HGq6wXyxX7GwzVQvRL4_qAm-UXjbiRNT/pub?embedded=true" width="80%" height="500px" type="application/pdf"></iframe>
                    {/* <img src="https://drive.google.com/file/d/1k0SDHHUbug-4NqL4gphyEKrf4UCA60F8/view?usp=sharing" alt="Bleh"/> */}
                </div>
            </div>
        </div>
    );
}