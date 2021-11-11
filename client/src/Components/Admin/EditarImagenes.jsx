import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../Redux/actions/imageAction";

export default function EditarImagenes(){

    const dispatch = useDispatch();
    
    var imagenes = useSelector(state => state.imagen.Images)
    
    const borrar = (e) => {
        axios.delete(`/imagenes/${e.target.id}`);
        alert(`La imagen fue eliminada con exito`);
        return dispatch(getImages());
    }
    
    return(
        <div className="editarImagenesAdmin">
            <h3>Editar Imagenes</h3>
            <ol>
                {imagenes.imagenes?.map((imagen, i) => {
                        return(
                            <li key={imagen.id}>
                                <div>
                                    <img src={imagen.imagen} alt="imagen galeria"/>
                                    <div>
                                        <button id={imagen.id} onClick={(e) => { borrar(e) }} type="submit">
                                            Eliminar
                                        </button>
                                    </div>
                                
                                </div>
                                
                            </li>)
                })}
            </ol>
        </div>
    )
}