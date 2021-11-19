import {productoConstante} from "../constants/tipadosDespacho";
import axios from 'axios';

//postear producto
export const postProduct = (producto) => {
    return (dispatch) => {
      axios
        .post(`/productos`, producto ,{withCredentials:true} )
        .then(() => {
          return dispatch({
            type: productoConstante.POST_PRODUCT,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  // obtener todos los productos, paginado, filtros y ordenamientos para la tienda
  export const getProducts = ({ nombre, ordenamiento, categoria, pagina }) => {
    console.log("aca el nombre",nombre,"aca el ordenamiento:",ordenamiento,"aca la categoria",categoria,"el numero de pagina es:", pagina)
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `/productos?pagina=${pagina ? pagina : 1}&ordenamiento=${
            ordenamiento ? ordenamiento : ""
          }&categoria=${
            categoria ? categoria : ""
          }&nombre=${nombre ? nombre : ""}`
         );
        return dispatch({
          type: productoConstante.GET_PRODUCTS,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };
  
  export const getProductsAdmin = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`/productos`/* ,{withCredentials:true} */);
        return dispatch({
          type: productoConstante.GET_PRODUCTS_ADMIN,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };
   
  //COMPLETAR
  //borrar producto
  export const deleteProduct = ({ id }) => {
    return (dispatch) => {
      axios
        .delete(`/productos/${id}`/* ,{withCredentials:true} */)
        .then((res) => {
          return dispatch({
            type: productoConstante.DELETE_PRODUCT,
            payload: id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  
  //CORREGIR
  //modificar un producto
  export const putProduct = ({ id }) => {
    return (dispatch) => {
      axios
        .put(`/productos/${id}`/* ,{withCredentials:true} */)
        .then((productUpdated) => {
          return dispatch({
            type: productoConstante.PUT_PRODUCT,
            payload: productUpdated.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  //obtener producto por id para su detalle
  export const getProductId = (id) => {
    return (dispatch) => {
      axios.get(`/productos/${id}`)
        .then((productDetail) => {
          return dispatch({
            type: productoConstante.GET_PRODUCT_ID,
            payload: productDetail.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
  
  //remover producto de la pagina de info
  export const removeProduct = () => {
    return {
      type: productoConstante.REMOVE_PRODUCT,
      payload: {},
    };
  };

  export const productosFiltrados = (nombreCategoria) => {
    return {
      type: productoConstante.FILTRADOCATEGORIAS,
      payload: nombreCategoria,
    };
  };

  //Seteos de pagina, filtros y ordenamientos
export const setCategoria = (categoria) => {
  return {
    type: "CAMBIO_DE_CATEGORIA",
    payload: categoria
  };
};

export const setNombre = (nombre) => {
  return {
    type: productoConstante.SET_NOMBRE,
    payload: nombre,
  };
};
export const setPagina = (pagina) => {
  return {
    type: productoConstante.SET_PAGINA,
    payload: pagina,
  };
};

export const setOrdenamiento = (ordenamiento) => {
  return {
    type: "CAMBIO_ORDENAMIENTO",
    payload: ordenamiento
  };
};

export function getComentarios(id) {
  return function(dispatch) {
    axios.get(`/comentarios/${id}`)
    .then(resp => {
      dispatch({
        type: productoConstante.GET_COMENTARIOS,
        payload: resp.data
      })
    })
  }
}

export const addComentarios = (usuarioId, productoId, comentarios, puntuacion) => {
  return (dispatch) => {
    axios
      .post(`/comentarios/newComment`, {usuarioId:usuarioId, productoId:productoId, comentarios:comentarios, puntuacion:puntuacion})
      .then(res => console.log(res.data))
      .then(obj => {
        console.log("Este es el objeto 174", obj)
        dispatch({
          type: productoConstante.ADD_COMENTARIOS,
          payload: {
            id: obj.id,
            comentarios: obj.comentarios,
            puntuacion: obj.puntuacion,
            usuarioId: obj.usuarioId,
            productoId: obj.productoId
          }
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const reset = () => {
  return {
    type: productoConstante.RESET,
  };
};

// export const setCategoria=(categoria)=>{
//   return{
//     type:"CAMBIO_DE_CATEGORIA",
//     payload:categoria
//   }
// }