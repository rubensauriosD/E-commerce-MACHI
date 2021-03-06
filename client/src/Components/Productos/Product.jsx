import { Link } from "react-router-dom";
import "./ProductStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartGuest,
  CambiarCantidadDb,
  aniadirObjetoCarritoDb,
} from "../../Redux/actions/cartAction";
import React from "react";
import DetalleProducto from "../../Pages/DetalleProducto";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "@mui/material";
export default function Product({
  id,
  nombre,
  imagen,
  precio,
  disponibilidad,
}) {
  const usuario = useSelector((state) => state.usuario.User);
  const objetosCarrito = useSelector((state) => state.cart.itemsCarritoDb);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    if (usuario.id) {
      const data = { nombre, imagen, precio };
      const objetoEncontrado = objetosCarrito.find(
        (objeto) => objeto.idProducto === id
      );
      if (objetoEncontrado) {
        dispatch(CambiarCantidadDb(objetoEncontrado.idCarrito, 1));
        //dispatch(añadirCarritoPost(data))
      } else {
        data.idCarrito = uuidv4();
        data.idProducto = id;
        dispatch(aniadirObjetoCarritoDb(data));
      }
    } else {
      dispatch(addToCartGuest(id));
    }
  };

  <DetalleProducto id={id}></DetalleProducto>;

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
            {!disponibilidad ? (
              <Alert severity="warning">Sin Stock</Alert>
            ) : (
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleOnClick}
                disabled={disponibilidad ? false : true}
              >
                <AddShoppingCartIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
