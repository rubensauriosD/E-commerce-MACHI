import React from "react";
import { useDispatch } from "react-redux";
import { changetQty, removeFromCart } from "../Redux/actions/cartAction";

const CartProduct = ({
  imagen,
  nombre,
  categoria,
  precio,
  descripcion,
  idCarrito,
  qty,
}) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(removeFromCart(idCarrito));
  };
  const handleOnQtyIncrement = () => {
    dispatch(changetQty(idCarrito, "increment"));
  };
  const handleOnQtyDecrement = () => {
    dispatch(changetQty(idCarrito, "decrement"));
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  let precioTotalProducto = precio * qty;
  return (
    <div className="infoContainer">
      <div className="allInfo">
        <img className="imgInfo" src={imagen} alt={nombre} />
        <div className="textInfo">
          <h1 className="nameInfo">{nombre}</h1>
          <p className="categoryInfo">{categoria}</p>
          <p className="priceInfo"> {formatter.format(precioTotalProducto)}</p>
          <p>Cantidad: {qty}</p>
          <button onClick={handleOnQtyIncrement}>+</button>
          <button onClick={handleOnQtyDecrement}>-</button>
          <button onClick={handleOnClick}>eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
