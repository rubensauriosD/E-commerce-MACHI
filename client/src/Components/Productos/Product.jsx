import {Link} from "react-router-dom"
import './ProductStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";



export default function Product({id,nombre,categoria,imagen,precio}){
    
    return(
        <div className="tarjeta">
            <div className="tarjetaInterior">
                <Link to={`/producto/${id}`} style={{textDecoration: "none"}}>
                <div className="tarjeta-imagen">
                    <img className="tarjeta-imagen-interior" src={imagen} alt="Y la Imagen?"  width="100vw"/>
                </div>
                <div className="nombre-precio-carrito">
                    <div className="nombre-precio">
                        <p className="product-nombre">{nombre}</p>
                        <p className="product-precio">${precio}</p>
                    </div>
                    <div className="carrito-products">
                        <FontAwesomeIcon icon={faShoppingCart} style={{color: "grey"}}/>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    )
}