import React, { useEffect } from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector,useDispatch } from "react-redux";
import PrecioTotal from "../Components/PrecioTotal";
import { NavLink } from "react-router-dom";
import { CambioDeLocalADb } from "../Redux/actions/cartAction";
const Cart = () => {
  const dispatch=useDispatch()
  const { cartItems } = useSelector((state) => state.cart);
  const usuarioAutenticado = useSelector((state)=>state.usuario.User)
  const itemsCarrito = useSelector((state)=>state.cart.itemsCarritoDb)
  useEffect(()=>{
    if(Object.values(usuarioAutenticado).length)dispatch(CambioDeLocalADb())
  },[dispatch,usuarioAutenticado])
  console.log(itemsCarrito)
  return (
    <div>
      <div>
        <h1>Cart</h1>
        {itemsCarrito&&itemsCarrito.length?itemsCarrito.map(producto=>{
          console.log("al mapear llega las siguientes propiedades: ", producto)
          return(
               <CartProduct
               key={producto.idCarrito}
               id={producto.idCarrito}
               imagen={producto.imagen}
               nombre={producto.nombre}
               //categoria={producto.categoria}
               precio={producto.precio}
               qty={producto.cantidad}
               usuarioId={producto.usuarioId}
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
        <PrecioTotal cartItems={itemsCarrito?itemsCarrito:cartItems} />
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
