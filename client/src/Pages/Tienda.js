import "../Styles/Tienda.css"
import {useSelector,useDispatch} from "react-redux"
import * as React from "react"
// import {productosFiltrados} from "../Redux/actions/action"
import Products from "../Components/Productos/Products"
import SearchBar from "../Components/Productos/SearchBar"
import FiltrosYOrden from "../Components/Productos/FiltrosYOrden"
import { getProducts, setPagina } from "../Redux/actions/action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

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
            <h1>Tienda</h1>
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
            <button className="Buttons Buttons_Left" disabled={pagina - 1 === 0} onClick={() => { changePagina(pagina - 1) }}> <FontAwesomeIcon icon={faChevronLeft} /></button>
                <label className="PageNumber">{pagina}</label>
            <button className="Buttons Buttons_Right" disabled={products?.contador <= (pagina * 6)} onClick={() => { changePagina(pagina + 1) }}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div>
    )
}