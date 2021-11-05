import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/actions/action";

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

  return (
    <div className="infoContainer">
      <div className="allInfo">
        <img className="imgInfo" src={imagen} alt={nombre} />
        <div className="textInfo">
          <h1 className="nameInfo">{nombre}</h1>
          <p className="categoryInfo">{categoria}</p>
          <p className="priceInfo">$ {precio}</p>
          <p>Cantidad: {qty}</p>
          <button onClick={handleOnClick}>eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
