import React from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector } from "react-redux";
import PrecioTotal from "../Components/PrecioTotal";
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
      <PrecioTotal cartItems={User.productos? User.productos : cartItems} />
    </div>
  );
};

export default Cart;
