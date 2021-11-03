import './CategoriaStyle.css'
import Categoria from "./Categoria";


export default function Categorias({categoria}){
    
   
    
    return(
        <div className='categoria-gral'>
            <h1>Nuestra Tienda</h1>
            <div className='categoria'>
                {categoria && Array.isArray(categoria)?categoria.map(elementoCategoria=>(
                    <Categoria value={elementoCategoria.nombre} key={elementoCategoria.nombre} nombreCategoria={elementoCategoria.nombre} imagenCategoria={elementoCategoria.imagen}/>
                )):<h1>No se encontraron categorias</h1>}
            </div>
        </div>
    )
}