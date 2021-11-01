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
                </Link>
                <div className="nombre-precio-carrito">
                    <Link to={`/producto/${id}`} style={{textDecoration: "none"}}>
                    <div className="nombre-precio">
                        <p className="product-nombre">{nombre}</p>
                        <p className="product-precio">${precio}</p>
                    </div>
                    </Link>
                    <div className="carrito-products">
                    <Link exact to="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} style={{color: "grey"}}/>
                    </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}