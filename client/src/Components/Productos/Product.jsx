import { Link } from "react-router-dom";
import "./ProductStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCartGuest } from "../../Redux/actions/cartAction";
import React from "react";
import DetalleProducto from "../../Pages/DetalleProducto";

export default function Product({ id, nombre, imagen, precio }) {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(addToCartGuest(id));
  };
  const usuario = useSelector((state)=>state.usuario.User)
  if(Object.values(usuario).length){
    console.log("existe el usuario")
  }

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
              <p className="product-precio">${precio}</p>
            </div>
          </Link>
          <div className="carrito-products">
            <button onClick={handleOnClick}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ color: "grey" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
