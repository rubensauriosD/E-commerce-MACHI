import './CategoriaStyle.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {setCategoria, getProducts} from "../../Redux/actions/productAction"

export default function Categoria({nombreCategoria,imagenCategoria}){

    const dispatch= useDispatch();
    const history = useHistory();

    function handleChange(){
        dispatch(setCategoria(nombreCategoria))
        dispatch(getProducts({categoria:nombreCategoria}))
        history.push(`/tienda/${nombreCategoria}`)
    }

    return(
            <div>
                { nombreCategoria !== "Servicios" ?
            
                    <label value={nombreCategoria} onClick={handleChange} key={nombreCategoria}>
                    <div className='categoria-gral' value={nombreCategoria} onClick={handleChange}> 
                        <div className='categoria-interna'>
                            <img src={imagenCategoria} alt="sin imagen" className='categoria-img'/>
                            <div className='categoria-texto'><p>{nombreCategoria.toUpperCase()}</p></div>
                        </div>   
                    </div>
                    </label>
                    :
                    <Link value={nombreCategoria} onClick={handleChange} key={nombreCategoria} to={`/Servicios`}>
                    <div className='categoria-gral' value={nombreCategoria} onClick={handleChange}> 
                        <div className='categoria-interna'>
                            <img src={imagenCategoria} alt="sin imagen" className='categoria-img'/>
                            <div className='categoria-texto'><p>{nombreCategoria.toUpperCase()}</p></div>
                        </div>   
                    </div>
                    </Link>
                }
            </div>
    )
}