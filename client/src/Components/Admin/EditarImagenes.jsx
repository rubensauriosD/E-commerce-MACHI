import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../Redux/actions/imageAction";
import { Button } from "@mui/material";
import swal from 'sweetalert';

export default function EditarImagenes(){

    const dispatch = useDispatch();
    
    var imagenes = useSelector(state => state.imagen.Images)
    
    const borrar = (e) => {
        axios.delete(`/imagenes/${e.target.id}`);
        swal(`La imagen fue eliminada con exito`);
        return dispatch(getImages());
    }
    
    return(
        <div>
        <h3>Editar Imagenes</h3>
        <div className="editarImagenesAdmin">
            
            
                {imagenes&&imagenes.map((imagen, i) => {
                        return(
                        <div className="carruselGaleria">
                             <div className="carruselGaleriaImgButton"><button style={{backgroundColor:"red", color:"white", margin:"2px", boxShadow:"none", cursor:"pointer"}} id={imagen.id} onClick={(e) => { borrar(e) }} type="submit" variant="contained" color="error" type="submit">X</button><br/></div>
                             <img className="carruselGaleriaImg" src={imagen.imagen} alt="imagen galeria"/><br/>
                        </div>)      
                                    
                })}
        </div>
        </div>
    )
}