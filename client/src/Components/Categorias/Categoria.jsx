import './CategoriaStyle.css';
import {Link} from "react-router-dom";

export default function Categoria({nombreCategoria,imagenCategoria}){

    return(
        <Link to={`/tienda/${nombreCategoria}`}>
        <div class='categoria-gral'> 
             <div class='categoria-interna'>
                 <img src={imagenCategoria} alt="sin imagen" class='categoria-img'/>
                 <div class='categoria-texto'><p>{nombreCategoria.toUpperCase()}</p></div>
              </div>   
        </div>
        </Link>
    )
}