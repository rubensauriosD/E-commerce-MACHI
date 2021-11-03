import axios from "axios";
export const POST_PRODUCT = "POST_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const POST_IMAGE = "POST_IMAGE";
export const GET_IMAGES = "GET_IMAGES";
export const DELETE_IMAGE = "DELETE_IMAGE"
export const PUT_IMAGE = "PUT_IMAGE"
export const POST_USER = "POST_USER"
export const GET_USERS = "GET_USERS"
export const DELETE_USER = "DELETE_USER"
export const PUT_USER = "PUT_USER"
export const INICIARS = "INICIAR_SESION"
export const FILTRADOCATEGORIAS="FILTRAR_POR_CATEGORIAS"
export const GETPRODUCTBYNAME = "GET_PRODUCT_BY_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PRECIO = "ORDER_BY_PRECIO";
export const SET_NOMBRE = 'SET_NOMBRE';
export const SET_PAGINA = 'SET_PAGINA';
export const SET_ORDEN_A = 'SET_ORDEN_A';
export const SET_ORDEN_P = 'SET_ORDEN_P';
export const SET_FILTRO_C = 'SET_FILTRO_C';
export const GET_PRODUCTS_ADMIN = 'GET_PRODUCTS_ADMIN';
export const CERRARSESION="CERRADO_DE_SESION"
//PRODUCTOS

//postear producto
export const postProduct = (producto) => {
  return (dispatch) => {
    axios
      .post(`/productos`, producto)
      .then((response) => {
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
export const getProducts = ({ nombre, ordenA, ordenP, filtroC, pagina })=>{
  return async (dispatch)=>{
    try {
      const response = await axios.get(`/productos?pagina=${pagina ? pagina : 1}&ordenA=${ordenA ? ordenA : ""}&ordenP=${ordenP ? ordenP : ""}&filtroC=${filtroC ? filtroC : ""}&nombre=${nombre ? nombre : ""}`)
      return dispatch({
        type: GET_PRODUCTS,
        payload: response.data
      })
      
    }catch(err){
      console.log(err)
      }
  }
}


export const getProductsAdmin = ()=>{
  return async (dispatch)=>{
    try {
      const response = await axios.get(`/productos`)
      return dispatch({
        type: GET_PRODUCTS_ADMIN,
        payload: response.data
      })
      
    }catch(err){
      console.log(err)
      }
  }
}


//COMPLETAR
//borrar producto
export const deleteProduct = ({id})=>{
  return (dispatch)=>{
    axios.delete(`/productos/${id}`)
    .then(res =>{
        return dispatch({
            type: DELETE_PRODUCT,
            payload: id
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//CORREGIR
//modificar un producto
export const putProduct = ({id})=>{
  return (dispatch)=>{
    axios.put(`/productos/${id}`)
    .then(productUpdated =>{
        return dispatch({
            type: PUT_PRODUCT,
            payload: productUpdated.data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//obtener producto por id para su detalle
export const getProductId = (id)=>{
  return (dispatch)=>{
    axios.get(`/productos/${id}`)
    .then(productDetail =>{
        return dispatch({
            type: GET_PRODUCT_ID,
            payload: productDetail.data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//remover producto de la pagina de info
export const removeProduct = ()=>{
  return{
      type: REMOVE_PRODUCT,
      payload: {}
  }
}


//IMAGENES


//postear imagen
export const postImage = (imagen) => {
  return (dispatch) => {
    axios
      .post(`/imagenes`, imagen)
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
export const getImages = ()=>{
  return (dispatch)=>{
      axios.get(`/imagenes`)
      .then(images =>{
          return dispatch({
              type: GET_IMAGES,
              payload: images.data
          })
      })
      .catch((err)=>{
          console.log(err)
      })
  }
}

//COMPLETAR
//borrar imagen
export const deleteImage = ({id})=>{
  return (dispatch)=>{
    axios.delete(`/imagenes/${id}`)
    .then(res =>{
        return dispatch({
            type: DELETE_IMAGE,
            payload: id
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//REVISAR
//modificar una imagen
export const putImage = ({id})=>{
  return (dispatch)=>{
    axios.put(`/imagenes/${id}`)
    .then(imageUpdate=>{
        return dispatch({
            type: PUT_IMAGE,
            payload: imageUpdate.data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//USUARIOS


//postear usuario
export const postUser = (user) => {
  return (dispatch) => {
    axios
      .post(`/usuarios`, user)
      .then((response) => {
        return dispatch({
          type: POST_USER,
          payload:response
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// obtener todos los usuarios
export const getUsers = ()=>{
  return (dispatch)=>{
      axios.get(`/usuarios`)
      .then(users =>{
          return dispatch({
              type: GET_USERS,
              payload: users.data
          })
      })
      .catch((err)=>{
          console.log(err)
      })
  }
}
//Iniciar Sesion
export const IniciarSesion=(usuario,history)=>{
  return(dispatch)=>{
    axios.post("/usuarios/inicioSesion",usuario)
    .then(resultadoDeUsuario=>{
      dispatch({type:INICIARS,payload:resultadoDeUsuario.data})
      if(resultadoDeUsuario.data.tipo==="admin")history.push("/Admin")
      else if(resultadoDeUsuario.data.tipo==="user")history.push("/cart")
    })
  }
}
export const cerrarSesion=()=>{
  return(dispatch)=>{
    axios.get("/usuarios/cerrarSesion")
    .then(resultado=>dispatch({type:CERRARSESION}))
  }
}
//COMPLETAR
//borrar usuario
export const deleteUser = ({id})=>{
  return (dispatch)=>{
    axios.delete(`/usuarios/${id}`)
    .then(res =>{
        return dispatch({
            type: DELETE_USER,
            payload: id
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}

//REVISAR
//modificar un usuario
export const putUser = ({id})=>{
  return (dispatch)=>{
    axios.put(`/usuarios/${id}`)
    .then(userUpdate=>{
        return dispatch({
            type: PUT_USER,
            payload: userUpdate.data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
}
export const productosFiltrados=(nombreCategoria)=>{

  return{
    type:FILTRADOCATEGORIAS,
    payload:nombreCategoria
  }
}


//BY_ORDER:
//Orden por nombre:

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  };
};

//Orden por precio:

export const orderByPrecio = (payload) => {
  return {
    type: ORDER_BY_PRECIO,
    payload
  }
}

//Seteos de pagina, filtros y ordenamientos
export const setFiltroC = (categoria) => {
  return {
      type: SET_FILTRO_C,
      payload: categoria
  }
}

export const setNombre = (nombre) => {
  return {
      type: SET_NOMBRE,
      payload: nombre
  }
}
export const setPagina = (pagina) => {
  return {
      type: SET_PAGINA,
      payload: pagina
  }
}

export const setOrdenA = (orden) => {
  return {
      type: SET_ORDEN_A,
      payload: orden
  }
}

export const setOrdenP = (orden) => {
  return {
      type: SET_ORDEN_P,
      payload: orden
  }
}