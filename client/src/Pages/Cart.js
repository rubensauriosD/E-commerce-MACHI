import React from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector } from "react-redux";
import PrecioTotal from "../Components/PrecioTotal";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const itemsCarrito = useSelector((state)=>state.usuario.User.models)
  console.log("lo que llega de carrito: ", itemsCarrito&&itemsCarrito)
  return (
    <div>
      <div>
        <h1>Cart</h1>

        {itemsCarrito&&itemsCarrito?itemsCarrito.map(producto=>{
          return(
               <CartProduct
               key={producto.idCarrito}
               id={producto.idCarrito}
               imagen={producto.imagen}
               nombre={producto.nombre}
               //categoria={producto.categoria}
               precio={producto.precio}
               qty={producto.cantidad}
             /> 
          )
        }) : cartItems &&
          cartItems.map((producto) => {
            return (
              <CartProduct
                key={producto.idCarrito}
                id={producto.idCarrito}
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
