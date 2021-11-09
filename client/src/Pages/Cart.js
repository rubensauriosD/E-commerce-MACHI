import React from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector } from "react-redux";
import PrecioTotal from "../Components/PrecioTotal";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const User = useSelector((state) => state.usuario.User);
  console.log("lo que llega de carrito", cartItems)
  return (
    <div>
      <div>
        <h1>Cart</h1>
        {cartItems &&
          cartItems.map((producto) => {
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
          })}
        <PrecioTotal cartItems={cartItems} />
      </div>
      <div>
        <NavLink exact to="/checkout">
          <button>Proceder al Pago</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
