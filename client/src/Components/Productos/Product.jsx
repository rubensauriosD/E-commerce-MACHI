import { Link } from "react-router-dom";
import "./ProductStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCartGuest,CambiarCantidadDb,aniadirObjetoCarritoDb } from "../../Redux/actions/cartAction";
import React from "react";
import DetalleProducto from "../../Pages/DetalleProducto";
import {v4 as uuidv4} from "uuid"
import {Alert} from "@mui/material"
export default function Product({ id, nombre, imagen, precio, disponibilidad, categoria }) {

  const usuario = useSelector((state)=>state.usuario.User)
  const objetosCarrito = useSelector((state)=>state.cart.itemsCarritoDb)
  const dispatch = useDispatch();
  const handleOnClick = () => {
    if(usuario.id){
      const data={nombre,imagen,precio}
      const objetoEncontrado=objetosCarrito.find(objeto=>objeto.idProducto===id)
      if(objetoEncontrado){
        dispatch(CambiarCantidadDb(objetoEncontrado.idCarrito,1))
        //dispatch(añadirCarritoPost(data))
      }else{
        data.idCarrito=uuidv4()
        data.idProducto=id
        dispatch(aniadirObjetoCarritoDb(data))
      }
    }
   else{
    dispatch(addToCartGuest(id));
   }
  };


  <DetalleProducto id={id}></DetalleProducto>

  return (
    <div className="tarjeta">
      <div className="tarjetaInterior">
        <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
          <div className="tarjeta-imagen">
            <img
              className="tarjeta-imagen-interior"
              src={imagen}
              alt="Y la Imagen?"
              width="100vw"
            />
          </div>
        </Link>
        <div className="nombre-precio-carrito">
          <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
            <div className="nombre-precio">
              <p className="product-nombre">{nombre}</p>
              {/* <p className="product-nombre">{categoria}</p> */}
              <p className="product-precio">${precio}</p>
            </div>
          </Link> 
          <div className="carrito-products">
          {!disponibilidad?<Alert severity="warning">Sin Stock</Alert>:<button onClick={handleOnClick} disabled={disponibilidad?false:true}>
              <FontAwesomeIcon 
                icon={faShoppingCart}
                style={{ color: "grey" }}
              />
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
}
