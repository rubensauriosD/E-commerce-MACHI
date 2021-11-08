import axios from "axios";
import dotenv from "dotenv";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const POST_IMAGE = "POST_IMAGE";
export const GET_IMAGES = "GET_IMAGES";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const PUT_IMAGE = "PUT_IMAGE";
export const POST_USER = "POST_USER";
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";
export const PUT_USER = "PUT_USER";
export const INICIARS = "INICIAR_SESION";
export const FILTRADOCATEGORIAS = "FILTRAR_POR_CATEGORIAS";
export const GETPRODUCTBYNAME = "GET_PRODUCT_BY_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PRECIO = "ORDER_BY_PRECIO";
export const SET_NOMBRE = "SET_NOMBRE";
export const SET_PAGINA = "SET_PAGINA";
export const SET_ORDEN_A = "SET_ORDEN_A";
export const SET_ORDEN_P = "SET_ORDEN_P";
export const SET_FILTRO_C = "SET_FILTRO_C";
export const GET_PRODUCTS_ADMIN = "GET_PRODUCTS_ADMIN";
export const CERRARSESION = "CERRADO_DE_SESION";
export const INICIOFACEBOOK = "INICIOSESIONCONFACEBOOK ";
export const ADD_TO_CART_GUEST = "ADD_TO_CART_GUEST";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const ACTUALIZAR_USUARIO_CARRITO="ACTUALIZAR_USUARIO_CARRITO"

export const CHANGE_QTY = "CHANGE_QTY";
dotenv.config();

//CARRITO
export const changetQty = (id, action) => {
  return {
    type: CHANGE_QTY,
    payload: { id, action },
  };
};
//añadir al carrito como invitado
export const addToCartGuest = (productID, qty) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.get(`/productos/${productID}`,{withCredentials:true});

    dispatch({
      type: ADD_TO_CART_GUEST,
      payload: {
        product: data,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cartItems));
  } catch (error) {
    console.log(error);
  }
};
//borrar del carrito como invitado
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cartItems));
};

//PRODUCTOS

//postear producto
export const postProduct = (producto, imagen) => {
  return (dispatch) => {
    axios
      .post(`/productos?imagen=${imagen}`, producto,{withCredentials:true})
      .then(() => {
        return dispatch({
          type: POST_PRODUCT,
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
        type: GET_PRODUCTS,
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
        type: GET_PRODUCTS_ADMIN,
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
          type: DELETE_PRODUCT,
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
          type: PUT_PRODUCT,
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
      .get(`/productos/${id}`,{withCredentials:true})
      .then((productDetail) => {
        return dispatch({
          type: GET_PRODUCT_ID,
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
    type: REMOVE_PRODUCT,
    payload: {},
  };
};

//IMAGENES

//postear imagen
export const postImage = (imagen) => {
  return (dispatch) => {
    axios
      .post(`/imagenes`, imagen,{withCredentials:true})
      .then((response) => {
        return dispatch({
          type: POST_IMAGE,
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
          type: GET_IMAGES,
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
          type: DELETE_IMAGE,
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
          type: PUT_IMAGE,
          payload: imageUpdate.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//USUARIOS

//postear usuario
export const postUser = (user) => {
  return (dispatch) => {
    axios
      .post(`/usuarios`, user,{withCredentials:true})
      .then((response) => {
        return dispatch({
          type: POST_USER,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// obtener todos los usuarios
export const getUsers = () => {
  return (dispatch) => {
    axios
      .get(`/usuarios`,{withCredentials:true})
      .then((users) => {
        return dispatch({
          type: GET_USERS,
          payload: users.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
//Iniciar Sesion
export const IniciarSesion = (usuario, history) => {
  return (dispatch) => {
    axios.post("/usuarios/inicioSesion", usuario,{withCredentials:true}).then((resultadoDeUsuario) => {
      dispatch({ type: INICIARS, payload: resultadoDeUsuario.data });
      if (resultadoDeUsuario.data.tipo === "admin") history.push("/Admin");
      else if (resultadoDeUsuario.data.tipo === "user") history.push("/cart");
    });
  };
};
export const cerrarSesion = () => {
  return (dispatch) => {
    axios
      .get("/usuarios/cerrarSesion",{withCredentials:true})
      .then((resultado) => dispatch({ type: CERRARSESION }));
  };
};
//COMPLETAR
//borrar usuario
export const deleteUser = ({ id }) => {
  return (dispatch) => {
    axios
      .delete(`/usuarios/${id}`,{withCredentials:true})
      .then((res) => {
        return dispatch({
          type: DELETE_USER,
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//REVISAR
//modificar un usuario
export const putUser = ({ id }) => {
  return (dispatch) => {
    axios
      .put(`/usuarios/${id}`,{withCredentials:true})
      .then((userUpdate) => {
        return dispatch({
          type: PUT_USER,
          payload: userUpdate.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const productosFiltrados = (nombreCategoria) => {
  return {
    type: FILTRADOCATEGORIAS,
    payload: nombreCategoria,
  };
};

//BY_ORDER:
//Orden por nombre:

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

//Orden por precio:

export const orderByPrecio = (payload) => {
  return {
    type: ORDER_BY_PRECIO,
    payload,
  };
};

//Seteos de pagina, filtros y ordenamientos
export const setFiltroC = (categoria) => {
  return {
    type: SET_FILTRO_C,
    payload: categoria,
  };
};

export const setNombre = (nombre) => {
  return {
    type: SET_NOMBRE,
    payload: nombre,
  };
};
export const setPagina = (pagina) => {
  return {
    type: SET_PAGINA,
    payload: pagina,
  };
};

export const setOrdenA = (orden) => {
  return {
    type: SET_ORDEN_A,
    payload: orden,
  };
};

export const setOrdenP = (orden) => {
  return {
    type: SET_ORDEN_P,
    payload: orden,
  };
};



export const checkout=(payer)=>{ 
  return (dispatch)=>{
  const setTime=null
    axios.post("/checkout",payer).then(resul=>{
    console.log(resul.data)
          const windowMercado=window.open(resul.data,"_blank",
          "width=500,height=600")
    });
  }
}

export const checkout=(payer)=>{
  return (dispatch)=>{
    const setTime=null
   // const urlMercadoPago=process.env.REACT_APP_API? `${process.env.REACT_APP_API}/checkout`:"http://localhost:3001/checkout"
      axios.post("/checkout",payer,{withCredentials:true}).then(resul=>{
        console.log(resul.data)
        const windowMercado=window.open(resul.data,"_blank",
        "width=500,height=600")
      }).catch(e=>console.log(e))
  }
}
export const facebookIni = (history) => {
  return (dispatch) => {
    let timer = null; 
    const facebookLoginURL = process.env.REACT_APP_API ? `${process.env.REACT_APP_API}/auth/facebook`: "http://localhost:3001/usuarios/auth/facebook";
    const newWindow = window.open(
      facebookLoginURL,
      "_blank",
      "width=500,height=600"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          axios
            .get("/usuarios/inicioSesionFacebook", { withCredentials: true })
            .then((usuario) => {
              dispatch({ type: INICIOFACEBOOK, payload: usuario.data });
              history.push("/cart");
            })
            .catch((error) => console.log(error));
          if (timer) clearInterval(timer);
        }
      });
    }
  };
};

