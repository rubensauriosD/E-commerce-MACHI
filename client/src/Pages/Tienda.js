import "../Styles/Tienda.css"
import {useSelector,useDispatch} from "react-redux"
import * as React from "react"
// import {productosFiltrados} from "../Redux/actions/action"
import Products from "../Components/Products"
import SearchBar from "../Components/SearchBar"
import FiltrosYOrden from "../Components/FiltrosYOrden"
import { getProducts, setPagina } from "../Redux/actions/action"

export default function Tienda(props){
    
    // const productosPorCategorias=useSelector(state=>state.productosPorCategorias)
    const { products, nombre, ordenA, ordenP, filtroC, pagina } = useSelector(state => state)
    
    const dispatch=useDispatch()
    React.useEffect(()=>{
        // dispatch(productosFiltrados(props))
        dispatch(getProducts({filtroC: props.nombreCategoria ? props.nombreCategoria : "" }))
    },[dispatch, props.nombreCategoria])

    const changePagina = (pagina) => {
        dispatch(getProducts({ pagina, ordenA, ordenP, filtroC, nombre }))
        dispatch(setPagina(pagina))
    }
   
    return(
        <div className="Store" >
            <div className="SearchContainer" >
                <SearchBar />
            
                <FiltrosYOrden />
            </div>
            <div className="ProdContTitle">
                <h1>{props.nombreCategoria}</h1>
                {/* <Products productos={productosPorCategorias}/>  */}
                <div className="ProductsContainer">
                    <Products productos={products.resultado} />
                </div>
            </div>
            <div className="PageButtons">
            <button className="Buttons" disabled={pagina - 1 === 0} onClick={() => { changePagina(pagina - 1) }}>⬅Anterior</button>
                <label className="PageNumber">{pagina}</label>
            <button className="Buttons" disabled={products?.contador <= (pagina * 6)} onClick={() => { changePagina(pagina + 1) }}>Siguiente➡</button>
            </div>
        </div>
    )
}