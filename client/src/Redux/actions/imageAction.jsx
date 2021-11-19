import { imagenConstantes } from "../constants/tipadosDespacho";
import axios from "axios";

//postear imagen
export const postImage = (imagen) => {
  return (dispatch) => {
    axios
      .post(`/imagenes`, imagen, { withCredentials: true })
      .then((response) => {
        return dispatch({
          type: imagenConstantes.POST_IMAGE,
          payload:response.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// obtener todas las imágenes
export const getImages = () => {
  return (dispatch) => {
    axios
      .get(`/imagenes`, { withCredentials: true })
      .then((images) => {
        return dispatch({
          type: imagenConstantes.GET_IMAGES,
          payload: images.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//COMPLETAR
//borrar imagen
export const borrar = (e,swal) => {
  return (dispatch) => {
    axios
      .delete(`/imagenes/${e.target.id}`, { withCredentials: true })
      .then((resultado) => resultado.data)
      .then((payload) => {
        swal(`La imagen fue eliminada con exito`);
        return dispatch({ type: imagenConstantes.DELETE_IMAGE, payload });
      });
  };
};
