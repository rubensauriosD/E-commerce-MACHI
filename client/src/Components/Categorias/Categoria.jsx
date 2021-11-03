import './CategoriaStyle.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux"
import {setFiltroC, getProducts} from "../../Redux/actions/action"

export default function Categoria({nombreCategoria,imagenCategoria}){

    const dispatch= useDispatch();
    //const { filtroC } = useSelector(state => state) 

    function handleChange(){
        dispatch(setFiltroC(nombreCategoria))
        dispatch(getProducts({filtroC:nombreCategoria}))
    }

    return(
        <Link value={nombreCategoria} onClick={handleChange} key={nombreCategoria} to={`/tienda/${nombreCategoria}`}>
        <div className='categoria-gral' value={nombreCategoria} onClick={handleChange}> 
             <div className='categoria-interna'>
                 <img src={imagenCategoria} alt="sin imagen" className='categoria-img'/>
                 <div className='categoria-texto'><p>{nombreCategoria.toUpperCase()}</p></div>
              </div>   
        </div>
        </Link>
    )
}