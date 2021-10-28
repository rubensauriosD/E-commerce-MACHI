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
export const ORDER_BY_CATEG= "ORDER_BY_CATEG";
//PRODUCTOS

//postear producto
export const postProduct = (producto) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/productos`, producto)
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

// obtener todos los productos
export const getProducts = ()=>{
  return (dispatch)=>{
      axios.get(`http://localhost:3001/productos`)
      .then(product =>{
          return dispatch({
              type: GET_PRODUCTS,
              payload: product.data
          })
      })
      .catch((err)=>{
          console.log(err)
      })
  }
}

// Filtrar producto por nombre:
export const getByName = (nombre) => {
  return(dispatch) => {
    axios.get(`http://localhost:3001/productos?nombre=${nombre}`)
    .then(res => {
      return dispatch({
        type: GETPRODUCTBYNAME,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

//COMPLETAR
//borrar producto
export const deleteProduct = ({id})=>{
  return (dispatch)=>{
    axios.delete(`http://localhost:3001/productos/${id}`)
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
    axios.put(`http://localhost:3001/productos/${id}`)
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
    axios.get(`http://localhost:3001/productos/${id}`)
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
      .post(`http://localhost:3001/imagenes`, imagen)
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
      axios.get(`http://localhost:3001/imagenes`)
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
    axios.delete(`http://localhost:3001/imagenes/${id}`)
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
    axios.put(`http://localhost:3001/imagenes/${id}`)
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
      .post(`http://localhost:3001/usuarios`, user)
      .then((response) => {
        return dispatch({
          type: POST_USER,
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
      axios.get(`http://localhost:3001/usuarios`)
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
export const IniciarSesion=(usuario)=>{
  return(dispatch)=>{
    axios.get("http://localhost:3001/usuarios/inicioS",usuario)
    .then(resultadoDeUsuario=>{
      dispatch({type:INICIARS,payload:resultadoDeUsuario})
    })
  }
}
//COMPLETAR
//borrar usuario
export const deleteUser = ({id})=>{
  return (dispatch)=>{
    axios.delete(`http://localhost:3001/usuarios/${id}`)
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
    axios.put(`http://localhost:3001/usuarios/${id}`)
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
export const orderByName = (ordenA) => {
  return(dispatch) => {
    axios.get(`http://localhost:3001/productos?ordenA=${ordenA}`)
    .then(res => {
      return dispatch({
        type: ORDER_BY_NAME,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//Orden por precio:
export const orderByPrecio = (ordenP) => {
  return(dispatch) => {
    axios.get(`http://localhost:3001/productos?ordenP=${ordenP}`)
    .then(res => {
      return dispatch({
        type: ORDER_BY_PRECIO,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

//*No se muy bien si esta remplaza a la otra, o si esta es solo para la tienda*/
//Orden por CATEGORIA:
export const orderByCateg = (filtroC) => {
  return(dispatch) => {
    axios.get(`http://localhost:3001/productos?filtroC=${filtroC}`)
    .then(res => {
      return dispatch({
        type: ORDER_BY_CATEG,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}