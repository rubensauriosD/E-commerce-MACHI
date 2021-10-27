import {Link} from "react-router-dom"

export default function Product({id,nombre,categoria,imagen,precio}){
    
    return(
        <div>
            <Link to={`/producto/${id}`}>
            <p>{nombre}</p>
            </Link>
            <p>{nombre}</p>
            <p>{categoria}</p>
            <img src={imagen} alt="Y la Imagen?"  width="100vw"/>
            <p>{precio}</p>
        </div>
    )
}