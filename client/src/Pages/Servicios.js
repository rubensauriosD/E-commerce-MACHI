import "../Styles/Servicios.css";
import * as React from "react";
import { Link } from "react-router-dom"
import CompstColab from "../imgEmpresas/CompstColab.png"


export default function Nosotros() {
    return (
        <div>
            <div className="container">
                <h1>Servicios</h1>
                <div className="data" >
                <h3>Servicio de compostaje colaborativo. </h3>
                    
                    <p className="parrafo">
                    Realizamos una alianza con ECOLINK para la logística de orgánicos compostables. 
                    Conectamos a empresas e instituciones que quieran gestionar correctamente sus residuos 
                    orgánicos brindándoles asesoría y herramientas para la correcta disposición de los mismos.<br/><br/>
                    Si queres empezar a compostar los desechos organicos generados por tu empresa o institucion 
                    no dudes en consultarnos a traves de nuestro apartado de <Link to="/contact" style={{textDecoration:"none", color:"green"}}>contacto</Link> o nuestro 
                    <a style={{textDecoration:"none", color:"green"}} href="https://wa.me/543512900724?text=Hola%20Machi,%20quiero%20saber%20mas%20sobre%20compostaje%20colaborativo" 
                    target="_blanck"> whatsapp </a> 
                     en la pagina!
                    </p>

                    <img className="serviciosImg" src={CompstColab} alt="no hay imagen"/>
                    <img src="" alt=""/>  
                    
                    {/*<iframe title="pdf de la empresa" className="pdf" src="https://docs.google.com/document/d/e/2PACX-1vRNhLuPoCvlfdaQjn-0L_v2Wwr71iyascPS10Itg_ha--u_HGq6wXyxX7GwzVQvRL4_qAm-UXjbiRNT/pub?embedded=true" width="80%" height="500px" type="application/pdf"></iframe>*/}
                    {/* <img src="https://drive.google.com/file/d/1k0SDHHUbug-4NqL4gphyEKrf4UCA60F8/view?usp=sharing" alt="Bleh"/> */}
                </div>
            </div>
        </div>
    );
}