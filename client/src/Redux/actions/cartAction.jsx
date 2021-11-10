import {cartConstantes} from '../constants/tipadosDespacho';
import axios from 'axios';

export const addToCartGuest = (productID, qty) => async (
    dispatch,
    getState
  ) => {
    try {
      const { data } = await axios.get(`/productos/${productID}`);
      console.log("lo que llega de la base de datos",data)
      dispatch({
        type: cartConstantes.ADD_TO_CART_GUEST,
        payload: {
          id: data.id,
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
          descripcion: data.descripcion,
          disponibilidad: data.disponibilidad,
          qty
        },
      });
      console.log("el getState: ",getState().cart.cartItems)
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

export const changetQty = (id, action) => (dispatch,getState)=>{
  dispatch( {
    type: cartConstantes.CHANGE_QTY,
    payload: { id, action },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const checkout=(payer, items)=>{
  console.table(items)
  return (dispatch)=>{
    const setTime=null
   // const urlMercadoPago=process.env.REACT_APP_API? `${process.env.REACT_APP_API}/checkout`:"http://localhost:3001/checkout"
     axios.post("/checkout", {payer , items} /*, {withCredentials:true} */).then(resul=>{
        console.log(resul.data)
       const windowMercado=window.open(resul.data,"_blank",
        "width=500,height=600")
      }).catch(e=>console.log(e))
  } 
}