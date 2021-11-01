import "../Styles/DetalleProducto.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router'
import {getProductId, removeProduct} from "../Redux/actions/action"


export default function DetalleProducto({props}){

    const {Product} =useSelector(state=>state)
    const dispatch=useDispatch()
    const history = useHistory()

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
                    
                </div>
                
            </div>
            <button className="infoButton" onClick={goToBack}>⏪Volver a la Tienda</button>
        </div>
    )
}