import { cartConstantes } from "../constants/tipadosDespacho";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const removeAllCartItems = () => (dispatch, getState) => {
  dispatch({
    type: cartConstantes.REMOVEALLITEMSFROMCARTITEMS,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const addToCartGuest = (productID, qty) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.get(`/productos/${productID}`);
    dispatch({
      type: cartConstantes.ADD_TO_CART_GUEST,
      payload: {
        idCarrito: uuidv4(),
        idProducto: data.id,
        nombre: data.nombre,
        precio: data.precio,
        imagen: data.imagen,
        descripcion: data.descripcion,
        disponibilidad: data.disponibilidad,
        qty,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.log(error);
  }
};

//borrar del carrito como invitado
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: cartConstantes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const changetQty = (id, action) => (dispatch, getState) => {
  dispatch({
    type: cartConstantes.CHANGE_QTY,
    payload: { id, action },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const checkout = (payer, items) => {
  return (dispatch) => {
    axios
      .post("/checkout", { payer, items }, { withCredentials: true })
      .then((resul) => {
        window.open(resul.data);
      })
      .catch((e) => console.log(e));
  };
};
export const CambioDeLocalADb = () => {
  return (dispatch) => {
    axios
      .get("/carrito", { withCredentials: true })
      .then((objetosDelCarrito) => objetosDelCarrito.data)
      .then((resultado) => {
        return resultado;
      })
      .then((payload) =>
        dispatch({ type: cartConstantes.OBTENCIONDELADB, payload })
      )
      .catch((e) =>
        console.error(
          `el error al intentar obtener los items del carro son: ${e}`
        )
      );
  };
};
//arregle esto para que no se mostraran numeros negativos en la cantidad
export const CambiarCantidadDb = (idCarrito, valor) => {
  return async (dispatch) => {
    try {
      const resultadoDeCarrito = await axios.put(
        `/carrito/${idCarrito}`,
        { valor },
        { withCredentials: true }
      );
     

      return dispatch({
        type: cartConstantes.CAMBIOCANTIDAD,
        payload: resultadoDeCarrito.data,
      });
    } catch (e) {
      console.log("el error en el cambio del carro fue: ", e);
    }
  };
};
export const borrarCarritoDb = () => {
  return (dispatch) => {
    axios
      .delete("/carrito", { withCredentials: true })
      .then((resul) =>
        dispatch({ type: cartConstantes.BORRADOCARRITOUSUARIO })
      );
  };
};
export const removerDeDb = (idCarrito) => {
  return (dispatch) => {
    axios
      .delete(`/carrito/${idCarrito}`, { withCredentials: true })
      .then((resultado) => {
        
        return resultado.data;
      })
      .then((payload) =>
        dispatch({ type: cartConstantes.REMOVIDODELADB, payload })
      )
      .catch((e) => console.error("el error al eliminar del carro fue: ", e));
  };
};

export const aniadirObjetoCarritoDb = (data) => {
  return (dispatch) => {
    axios
      .post("/carrito", data, { withCredentials: true })
      .then((resultado) => {
        
        return resultado.data;
      })
      .then((payload) =>
        dispatch({ type: cartConstantes.ANIADIRALCARRO, payload })
      )
      .catch((error) =>
        console.error("error al postear el item al carro: ", error)
      );
  };
};
export const removerAlCerrarSesion = () => {
 
  return {
    type: cartConstantes.REMOVERDELCARROCERRARSESION,
  };
};

export const datosDeFactura = (payer, items) => (dispatch, getState) => {
  
  const datosFacturas = {
    payer,
    items,
  };
  dispatch({
    type: cartConstantes.DATOSDEFACTURA,
    payload: datosFacturas,
  });
  
  localStorage.setItem(
    "datosFactura",
    JSON.stringify(getState().cart.datosFactura)
  );
};

export const sendMail = (payer, items) => {
 
  return (dispatch) => {
    axios
      .post("/mailer", { payer, items })
      .then((result) => {
        console.log("Mail enviado");
      })
      .catch((e) => console.log(e));
  };
};
