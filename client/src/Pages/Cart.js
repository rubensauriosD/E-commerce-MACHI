import React from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector } from "react-redux";
const Cart = () => {
  const { cartItems } = useSelector((state) => state);
  const User = useSelector((state)=>state.User);
  return (
    <div>
      <h1>Cart</h1>
      {User.productos ? User.productos.map((producto) => {
        return (
          <CartProduct
            key={producto.id}
            id={producto.id}
            imagen={producto.imagen}
            nombre={producto.nombre}
            categoria={producto.categoria}
            precio={producto.precio}
            qty={producto.qty}
          />
        );
      })
      : cartItems&&cartItems.map((producto) => {
        return (
          <CartProduct
            key={producto.id}
            id={producto.id}
            imagen={producto.imagen}
            nombre={producto.nombre}
            categoria={producto.categoria}
            precio={producto.precio}
            qty={producto.qty}
          />
        );
      })
    }
    </div>
  );
};

export default Cart;
