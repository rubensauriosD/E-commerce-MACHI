import {Link} from "react-router-dom"

export default function Categoria({nombreCategoria,imagenCategoria}){

    return(
        <Link to={`/tienda/${nombreCategoria}`}>
        <div styles={`background-image:url(${imagenCategoria}); background-size:30vw 20vh`}>
        {/* <div> */}
            <p>{nombreCategoria}</p>
            {/* <img src={imagenCategoria}alt="sin imagen"/> */}
        </div>
        </Link>
    )
}