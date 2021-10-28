import Categoria from "./Categoria";
import CategoriesCSS from "../Styles/Categories.module.css";
export default function Categorias({ categoria }) {
  return (
    <div className={CategoriesCSS.cards}>
      {categoria && Array.isArray(categoria) ? (
        categoria.map((elementoCategoria) => (
          <Categoria
            key={elementoCategoria.nombre}
            nombreCategoria={elementoCategoria.nombre}
            imagenCategoria={elementoCategoria.imagen}
          />
        ))
      ) : (
        <h1>No se encontraron categorias</h1>
      )}
    </div>
  );
}
