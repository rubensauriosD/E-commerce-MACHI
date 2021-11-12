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
    //console.log("lo que llega de la base de datos",data)
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
    console.log("el getState: ", getState().cart.cartItems);
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
  //const data={payer,items}
  console.log("se disparo el boton");
  return (dispatch) => {
    // const urlMercadoPago=process.env.REACT_APP_API? `${process.env.REACT_APP_API}/checkout`:"http://localhost:3001/checkout"
    axios
      .post("/checkout", { payer, items }, { withCredentials: true })
      .then((resul) => {
        console.log("llego", resul.data);
        const windowMercado = window.open(
          resul.data,
          "_blank",
          "width=500,height=600"
        );
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
        console.log("aca el resultado", resultado);
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
  console.log(
    "lo que se le envia para encontrar le item del carro: ",
    idCarrito
  );
  return (dispatch) => {
    axios
      .put(`/carrito/${idCarrito}`, { valor }, { withCredentials: true })
      .then((resultadoDeCarrito) => {
        console.log("hubo cambio, y el cambio fue: ", resultadoDeCarrito.data);
        return resultadoDeCarrito.data;
      })
      .then((payload) =>
        dispatch({ type: cartConstantes.CAMBIOCANTIDAD, payload })
      )
      .catch((e) => console.log("el error en el cambio del carro fue: ", e));
  };
};

export const removerDeDb = (idCarrito) => {
  return (dispatch) => {
    axios
      .delete(`/carrito/${idCarrito}`, { withCredentials: true })
      .then((resultado) => {
        console.log(resultado.data);
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
        console.log(
          "aca el resultado de añadir desde el carro: ",
          resultado.data
        );
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
  console.log("llego al action");
  return {
    type: cartConstantes.REMOVERDELCARROCERRARSESION,
  };
};

export const datosDeFactura = (payer, items) => {
  console.log('recibir datos de factura')
  const data = {
    payer,
    items
  }
  console.log(data);
  return {
    type: cartConstantes.DATOSDEFACTURA,
    payload: data
  }
}

export const sendMail = (payer, items) => {
  //const data={payer,items}
  console.log("se hace el envio");
  return (dispatch) => {
    // const urlMercadoPago=process.env.REACT_APP_API? `${process.env.REACT_APP_API}/checkout`:"http://localhost:3001/checkout"
    axios
      .post("/mailer", { payer, items })
      .then((result) => { console.log("Mail enviado")})
      .catch((e) => console.log(e));
  };
};