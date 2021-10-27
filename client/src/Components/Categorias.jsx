import Categoria from "./Categoria"
export default function Categorias({categoria}){
    
    return(
        <div>
            {categoria&&Array.isArray(categoria)?categoria.map(elementoCategoria=>(
                <Categoria key={elementoCategoria.nombre}nombreCategoria={elementoCategoria.nombre}imagenCategoria={elementoCategoria.imagen}/>
            )):<h1>No se encontraron categorias</h1>}
        </div>
    )
}