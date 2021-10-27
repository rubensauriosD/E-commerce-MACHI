import {useSelector,useDispatch} from "react-redux"
import * as React from "react"
import {productosFiltrados} from "../Redux/actions/action"
import Products from "../Components/Products"
export default function Tienda({props}){
    const productosPorCategorias=useSelector(state=>state.productosPorCategorias)
    const dispatch=useDispatch()
    React.useEffect(()=>{
        dispatch(productosFiltrados(props))
    },[dispatch])
    return(
        <div>
            <h1>{props.nombreCategoria}</h1>
            <Products productos={productosPorCategorias}/> 
        </div>
    )
}