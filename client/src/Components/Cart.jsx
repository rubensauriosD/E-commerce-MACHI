import "../Styles/Cart.css"
import carrito from "../Styles/cuarrito.png"
import React from "react"
import { NavLink } from "react-router-dom";
//import { useSelector } from "react-redux";




const Cart = () => {

  /*   const {cartItems} = useSelector((state) => state);
  
    const getCartCount = () => {
        return parseInt(cartItems.reduce((qty, item) => Number(item.qty) + qty, 0));
    };
 */
    return (
        <NavLink
            className="NavCart"
            exact to="/cart">
            <img className="carrito" src={carrito} alt="" />
            {/* <span>
              Items <span className="cartlogo__badge">{getCartCount()}</span>
            </span> */}
        </NavLink>


    )}
export default Cart