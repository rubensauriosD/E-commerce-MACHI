import React from "react";
import { useDispatch } from "react-redux";
import { changetQty, removeFromCart } from "../Redux/actions/action";

const CartProduct = ({
  imagen,
  nombre,
  categoria,
  precio,
  descripcion,
  id,
  qty,
}) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(removeFromCart(id));
  };
  const handleOnQtyIncrement = () => {
    dispatch(changetQty(id, "increment"));
  };
  const handleOnQtyDecrement = () => {
    dispatch(changetQty(id, "decrement"));
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
