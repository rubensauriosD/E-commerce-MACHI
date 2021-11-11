import {productoConstante} from "../constants/tipadosDespacho";
import axios from 'axios';

//postear producto
export const postProduct = (producto, imagen) => {
    return (dispatch) => {
      axios
        .post(`/productos?imagen=${imagen}`, producto,{withCredentials:true})
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
  export const getProducts = ({ nombre, ordenA, ordenP, filtroC, pagina }) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `/productos?pagina=${pagina ? pagina : 1}&ordenA=${
            ordenA ? ordenA : ""
          }&ordenP=${ordenP ? ordenP : ""}&filtroC=${
            filtroC ? filtroC : ""
          }&nombre=${nombre ? nombre : ""}`
          ,{withCredentials:true});
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
        const response = await axios.get(`/productos`,{withCredentials:true});
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
        .delete(`/productos/${id}`,{withCredentials:true})
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
        .put(`/productos/${id}`,{withCredentials:true})
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
      axios
        .get(`/productos/${id}`)
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
export const setFiltroC = (categoria) => {
  return {
    type: productoConstante.SET_FILTRO_C,
    payload: categoria,
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

export const setOrdenA = (orden) => {
  return {
    type: productoConstante.SET_ORDEN_A,
    payload: orden,
  };
};

export const setOrdenP = (orden) => {
  return {
    type: productoConstante.SET_ORDEN_P,
    payload: orden,
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