import "../Styles/Cart.css"
import carrito from "../Styles/cuarrito.png"
import React from "react"
import { NavLink } from "react-router-dom";
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Cart = () => {
    return (
        <NavLink
            className="NavCart"
            exact to="/cart">
            <img className="carrito" src={carrito} alt="" />
        </NavLink>


    )}
export default Cart