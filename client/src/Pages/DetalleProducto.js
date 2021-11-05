import "../Styles/DetalleProducto.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router'
import {getProductId, removeProduct, addToCartGuest} from "../Redux/actions/action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";




export default function DetalleProducto({props}){
    
    const {Product} =useSelector(state=>state)
    const dispatch=useDispatch()
    const history = useHistory()
    
    const handleOnClick = () => {
        dispatch(addToCartGuest(Product.id));
      };

    useEffect(()=>{
        dispatch(getProductId(props))
        return()=>{
            dispatch(removeProduct())
        }
    },[dispatch,props])

    const goToBack = ()=>{
        history.goBack()
    }

    return(
        <div className="infoContainer">
            <div className="allInfo">
                <img className="imgInfo" src={Product.imagen}alt="Y la imagen?"/>
                <div className="textInfo">
                    <h1 className="nameInfo">{Product.nombre}</h1>
                    <p className="categoryInfo">{Product.categoria}</p>
                    <p className="priceInfo">$ {Product.precio}</p>
                    <p className="desInfo">Descripción: {Product.descripcion}</p>
                <div className="carrito-products">
                    <button onClick={handleOnClick}>
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        style={{ color: "grey" }}
                    />
                    </button>
                </div>
                    
                </div>
                
            </div>
            <button className="infoButton" onClick={goToBack}>⏪Volver a la Tienda</button>
        </div>
    )
}