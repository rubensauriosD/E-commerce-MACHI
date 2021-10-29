import './CategoriaStyle.css';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {setFiltroC, getProducts} from "../../Redux/actions/action"

export default function Categoria({nombreCategoria,imagenCategoria}){

    const dispatch= useDispatch();
    const { products, filtroC } = useSelector(state => state) 

    function handleChange(){
        dispatch(setFiltroC(nombreCategoria))
        dispatch(getProducts({filtroC:nombreCategoria}))

       console.log(nombreCategoria)
    }

    return(
        <Link value={nombreCategoria} onClick={handleChange} key={nombreCategoria} to={`/tienda/${nombreCategoria}`}>
        <div class='categoria-gral' value={nombreCategoria} onClick={handleChange}> 
             <div class='categoria-interna'>
                 <img src={imagenCategoria} alt="sin imagen" class='categoria-img'/>
                 <div class='categoria-texto'><p>{nombreCategoria.toUpperCase()}</p></div>
              </div>   
        </div>
        </Link>
    )
}