import React, { useEffect } from "react";
import CartProduct from "../Components/CartProduct";
import { useSelector, useDispatch } from "react-redux";
import PrecioTotal from "../Components/PrecioTotal";
import { NavLink } from "react-router-dom";
import {
  CambioDeLocalADb,
  removeFromCart,
  removerDeDb,
} from "../Redux/actions/cartAction";

import PaymentIcon from "@mui/icons-material/Payment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../Styles/Cart.css";
import { getProducts } from "../Redux/actions/productAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const usuarioAutenticado = useSelector((state) => state.usuario.User);
  const itemsCarrito = useSelector((state) => state.cart.itemsCarritoDb);
  const products = useSelector((state) => state.productos.products);

  console.log("carrito de usuario  primer console", itemsCarrito);
  console.log("products", products);
  console.log("cartItems", cartItems);
  useEffect(() => {
    // dispatch(getProducts());
    //solo falta este dipatch para no entrar en la tienda
    if (Object.values(usuarioAutenticado).length) {
      console.log("carrito de usuario", itemsCarrito);
      dispatch(CambioDeLocalADb());
      for (let i = 0; i < itemsCarrito.length; i++) {
        console.log("i", i);
        for (let j = 0; j < products.productos.length; j++) {
          console.log("j", j);
          if (itemsCarrito[i].idProducto == products.productos[j].id) {
            console.log("entro en el break");
            break;
          }
          if (j >= products.productos.length - 1) {
            console.log("entro en la deletacion", itemsCarrito[i].idProducto);
            dispatch(removerDeDb(itemsCarrito[i].idCarrito));
          }
        }
      }
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        console.log("i", i);
        for (let j = 0; j < products.productos.length; j++) {
          console.log("j", j);
          if (cartItems[i].idProducto == products.productos[j].id) {
            console.log("entro en el break");
            break;
          }
          if (j >= products.productos.length - 1) {
            console.log(
              "entro en la deletacion pero de invitado ",
              cartItems[i].idProducto
            );
            dispatch(removeFromCart(cartItems[i].idCarrito));
          }
        }
      }
    }
  }, [dispatch, usuarioAutenticado]);
  console.log(itemsCarrito);
  const celWhat = 543512900724;
  let totalSinDescuento = Math.ceil(
    cartItems.reduce((total, item) => total + item.precio * item.qty, 0)
  );
  let totalConDescuento = Math.ceil(
    cartItems.reduce((total, item) => total + item.precio * item.qty, 0) * 0.9
  );

  return (
    <div>
      <div>
        <h2>Carrito</h2>
        {itemsCarrito && itemsCarrito.length
          ? itemsCarrito.map((producto) => {
              console.log(
                "al mapear llega las siguientes propiedades: ",
                producto
              );
              return (
                <CartProduct
                  key={producto.idCarrito}
                  id={producto.idCarrito}
                  imagen={producto.imagen}
                  nombre={producto.nombre}
                  categoria={producto.categoria}
                  disponibilidad={producto.disponibilidad}
                  precio={producto.precio}
                  qty={producto.cantidad}
                  usuarioId={producto.usuarioId}
                />
              );
            })
          : cartItems &&
            cartItems.map((producto) => {
              return (
                <CartProduct
                  key={producto.idCarrito}
                  id={producto.idCarrito}
                  imagen={producto.imagen}
                  nombre={producto.nombre}
                  categoria={producto.categoria}
                  precio={producto.precio}
                  disponibilidad={producto.disponibilidad}
                  qty={producto.qty}
                />
              );
            })}
        <PrecioTotal
          cartItems={itemsCarrito.length ? itemsCarrito : cartItems}
        />
      </div>
      <div className="parrafoCompra">
        <div className="parrafoCompraInterno">
          <p>
            Para pagar con Debito, Pago Facil, Rapi Pago o Credito clickea aqui
          </p>
          <NavLink exact to="/checkout">
            <PaymentIcon style={{ fontSize: "35px" }} />
          </NavLink>
        </div>
        <div className="parrafoCompraInterno">
          <p>
            Para continuar tu compra por transferencia o efectivo con{" "}
            <b>10% off</b> clickea aqui
          </p>
          <a
            href={`https://wa.me/${celWhat}?text=Hola%20Machi,%20quiero%20comprar%20${cartItems.map(
              (el) => `${el.qty} ${el.nombre} de $${el.precio}`
            )}%20por%20una%20suma%20de%20$${totalSinDescuento}%20mas%20el%2010%%20de%20descuento%20por%20comprar%20por%20transferencia%20o%20efectivo,%20que%20queda%20en%20un%20total%20%20$${totalConDescuento}`}
            target="_blanck"
          >
            <WhatsAppIcon style={{ color: "green", fontSize: "35px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
