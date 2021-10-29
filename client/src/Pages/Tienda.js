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
        <div>
            <div>
                <SearchBar />
            </div>
            <div>
                <FiltrosYOrden />
            </div>
            <h1>{props.nombreCategoria}</h1>
            {/* <Products productos={productosPorCategorias}/>  */}
            <div>
                <Products productos={products.resultado} />
            </div>
            <div>
            <button disabled={pagina - 1 === 0} onClick={() => { changePagina(pagina - 1) }}>Anterior</button>
                <label>{pagina}</label>
            <button disabled={products?.contador <= (pagina * 6)} onClick={() => { changePagina(pagina + 1) }}>Siguiente</button>
            </div>
        </div>
    )
}