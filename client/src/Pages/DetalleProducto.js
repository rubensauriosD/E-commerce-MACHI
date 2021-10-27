import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getProductId} from "../Redux/actions/action"

export default function DetalleProducto({props}){
    const DetalleProducto=useSelector(state=>state.Product)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getProductId(props))
    },[dispatch,props])
    return(
        <div>
            <p>{DetalleProducto.nombre}</p>
            <p>{DetalleProducto.categoria}</p>
            <p>{DetalleProducto.precio}</p>
            <p>{DetalleProducto.descripcion}</p>
            <img src={DetalleProducto.imagen}alt="Y la imagen?" width="100vw    "/>
        </div>
    )
}