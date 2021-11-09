import {imagenConstantes} from '../constants/tipadosDespacho'
import axios from 'axios';

//postear imagen
export const postImage = (imagen) => {
    return (dispatch) => {
      axios
        .post(`/imagenes`, imagen,{withCredentials:true})
        .then((response) => {
          return dispatch({
            type: imagenConstantes.POST_IMAGE,
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
        .get(`/imagenes`,{withCredentials:true})
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
  export const deleteImage = ({ id }) => {
    return (dispatch) => {
      axios
        .delete(`/imagenes/${id}`,{withCredentials:true})
        .then((res) => {
          return dispatch({
            type: imagenConstantes.DELETE_IMAGE,
            payload: id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  //REVISAR
  //modificar una imagen
  export const putImage = ({ id }) => {
    return (dispatch) => {
      axios
        .put(`/imagenes/${id}`,{withCredentials:true})
        .then((imageUpdate) => {
          return dispatch({
            type: imagenConstantes.PUT_IMAGE,
            payload: imageUpdate.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };